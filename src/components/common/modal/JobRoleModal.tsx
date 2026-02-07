'use client'
import { Button, Label, Modal, TextInput } from '@/components/common'
import { useModalStore } from '@/store/modalStore'
import { getJobRoleLabel, getJobRoleList, getSelectedCategoriesFromRoles, JOB_CATEGORY_LIST } from '@/utils/filterList'
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CheckIcon, Gray5XIcon, UncheckIcon } from '@/assets/svgComponents'
import { JobCategoryType, JobRoleType } from '@/types/job-post'

interface JobRoleModalProps {
  selectedCategory: JobCategoryType | undefined
  setSelectedJobCategory: Dispatch<SetStateAction<JobCategoryType | undefined>>
  selectedJobRoles: JobRoleType[] | undefined
  deleteJobRoles: (selectedJobRole: JobRoleType) => void
  addJobRoles: (selectedJobRole: JobRoleType) => void
  onApply: () => void
  onReset: () => void
}

export default function JobRoleModal({
  selectedCategory,
  setSelectedJobCategory,
  selectedJobRoles,
  deleteJobRoles,
  addJobRoles,
  onApply,
  onReset,
}: JobRoleModalProps) {
  const [jobRoleList, setJobRoleList] = useState<{ code: JobRoleType; label: string }[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  const { t } = useTranslation()

  useEffect(() => {
    const list = getJobRoleList(selectedCategory)
    setJobRoleList(list)
  }, [selectedCategory])

  // 검색어에 맞는 직무 필터링
  const filteredRoles = useMemo(() => {
    if (!searchQuery.trim()) return jobRoleList

    return jobRoleList.filter((role) => role.label.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [jobRoleList, searchQuery])

  // 검색 결과에 포함된 직군 찾기
  const categoriesWithSearchResults = useMemo(() => {
    if (!searchQuery.trim()) return new Set<JobCategoryType>()

    const matchedRoles = filteredRoles.map((role) => role.code)
    return new Set(getSelectedCategoriesFromRoles(matchedRoles as JobRoleType[]))
  }, [filteredRoles, searchQuery])

  // 직군명 검색으로 필터링된 카테고리
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return JOB_CATEGORY_LIST

    return JOB_CATEGORY_LIST.filter((category) => category.label.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [searchQuery])

  // 직군 검색 시 해당 직군의 모든 직무 표시
  const displayedRoles = useMemo(() => {
    if (!searchQuery.trim()) return jobRoleList

    // 직군명이 검색어와 일치하면 그 직군의 모든 직무 표시
    const isCategoryMatch = JOB_CATEGORY_LIST.some(
      (cat) => cat.label.toLowerCase().includes(searchQuery.toLowerCase()) && cat.code === selectedCategory
    )

    if (isCategoryMatch) {
      return jobRoleList
    }

    // 아니면 직무 검색 결과
    return filteredRoles
  }, [jobRoleList, filteredRoles, searchQuery, selectedCategory])

  const { isJobRoleModalOpen, setIsJobRoleModalOpen } = useModalStore((state) => state)
  const onClose = () => {
    setIsJobRoleModalOpen(isJobRoleModalOpen)
  }

  return (
    <Modal customClassName={'desktop:w-[860px] tablet:w-[680px]'} isOpen={isJobRoleModalOpen} onClose={onClose}>
      <Modal.Header
        rightElement={
          <Button onClick={onReset} size={'sm'} customClassName={'w-[70px]'} variant={'outline'}>
            초기화
          </Button>
        }
      >
        <Label label={'직무선택'} type={'titleMd'} />
      </Modal.Header>

      <Modal.Body>
        <div className="flex flex-col gap-y-4">
          <TextInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            status={'default'}
            placeholder={t('filter.jobRoleFilter.jobRoleSearchPlaceHolder')}
          />
          <section className="border-gray2 flex h-[500px] gap-x-3 rounded-[12px] border bg-white p-3">
            {/* 왼쪽: 직군 리스트 (30%) */}
            <div className="flex w-[50%] flex-shrink-0 flex-col gap-y-2 overflow-y-scroll">
              {(searchQuery ? filteredCategories : JOB_CATEGORY_LIST).map((jobCategory) => (
                <button
                  type={'button'}
                  onClick={() => setSelectedJobCategory(jobCategory.code)}
                  className={`${
                    jobCategory.code === selectedCategory
                      ? 'border-main-500 bg-main-100 text-main-500 rounded-[12px] border transition hover:opacity-[80%] hover:duration-75'
                      : ''
                  } ${
                    searchQuery && filteredCategories.some((cat) => cat.code === jobCategory.code)
                      ? 'rounded-[12px] border border-yellow-300 bg-yellow-100 transition hover:opacity-[80%] hover:duration-75'
                      : ''
                  } badge-sm text-gray5 flex h-[36px] w-full flex-shrink cursor-pointer items-center justify-center py-3 whitespace-nowrap transition transition-colors hover:opacity-[80%] hover:duration-75`}
                  key={jobCategory.code}
                >
                  {t(jobCategory.label)}
                </button>
              ))}
            </div>

            {/* 구분선 */}
            <div className="border-gray2 border-r" />

            {/* 오른쪽: 직무 리스트 (70%) */}
            <div className="flex w-full flex-col gap-y-1 overflow-y-scroll">
              {displayedRoles.length > 0 ? (
                displayedRoles.map((jobRole) => (
                  <button
                    type="button"
                    onClick={() => {
                      addJobRoles(jobRole.code)
                    }}
                    className={`badge-sm text-gray5 flex h-[36px] w-full cursor-pointer items-center justify-between rounded-[8px] px-2 py-3 text-start whitespace-nowrap transition transition-colors hover:opacity-[80%] hover:duration-75 ${
                      searchQuery && filteredRoles.some((role) => role.code === jobRole.code) ? 'bg-yellow-50' : ''
                    }`}
                    key={jobRole.code}
                  >
                    <p className="truncate">{t(jobRole.label)}</p>
                    {selectedJobRoles?.includes(jobRole.code) ? (
                      <CheckIcon width={16} height={16} className="ml-2 flex-shrink-0" />
                    ) : (
                      <UncheckIcon width={16} height={16} className="ml-2 flex-shrink-0" />
                    )}
                  </button>
                ))
              ) : searchQuery ? (
                <p className="p-4 text-sm text-gray-400">검색 결과가 없습니다</p>
              ) : null}
            </div>
          </section>
          <section className="flex gap-x-2 overflow-x-scroll">
            {selectedJobRoles?.map((selectedJobRole) => (
              <button
                onClick={() => deleteJobRoles(selectedJobRole)}
                type="button"
                key={selectedJobRole}
                className="border-gray3 bg-gray1 badge-sm text-gray5 flex cursor-pointer items-center rounded-full border px-3 py-2 whitespace-nowrap transition hover:opacity-[80%] hover:duration-75"
              >
                {t(getJobRoleLabel(selectedJobRole))}
                <Gray5XIcon width={20} height={20} />
              </button>
            ))}
          </section>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={onClose} size={'lg'} variant={'outline'} customClassName={'w-[200px]'}>
          닫기
        </Button>
        <Button onClick={onApply}>완료</Button>
      </Modal.Footer>
    </Modal>
  )
}
