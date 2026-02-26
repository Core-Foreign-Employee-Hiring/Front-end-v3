'use client'
import { Button, Label, Modal, TextInput } from '@/components/common'
import { useModalStore } from '@/store/modalStore'
import { getJobRoleLabel, getJobRoleList, JOB_CATEGORY_LIST } from '@/utils/filterList'
import { Dispatch, SetStateAction, useMemo, useState } from 'react'
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
  const [searchQuery, setSearchQuery] = useState('')
  const { t } = useTranslation(['filter', 'modal'])

  // Zustand store 구독 최적화 (modals 객체 전체가 아닌 필요한 값과 함수만)
  const isJobRoleModalOpen = useModalStore((state) => state.modals.isJobRoleModalOpen)
  const setModal = useModalStore((state) => state.setModal)

  /**
   * ✅ 수정 포인트: useState + useEffect 대신 useMemo 사용
   * selectedCategory가 바뀔 때만 리스트를 새로 가져옵니다.
   */
  const jobRoleList = useMemo(() => {
    return getJobRoleList(selectedCategory)
  }, [selectedCategory])

  // 검색어에 맞는 직무 필터링
  const filteredRoles = useMemo(() => {
    if (!searchQuery.trim()) return jobRoleList
    return jobRoleList.filter((role) => role.label.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [jobRoleList, searchQuery])

  // 직군명 검색으로 필터링된 카테고리
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return JOB_CATEGORY_LIST
    return JOB_CATEGORY_LIST.filter((category) => category.label.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [searchQuery])

  // 직군 검색 시 해당 직군의 모든 직무 표시 로직
  const displayedRoles = useMemo(() => {
    if (!searchQuery.trim()) return jobRoleList

    const isCategoryMatch = JOB_CATEGORY_LIST.some(
      (cat) => cat.label.toLowerCase().includes(searchQuery.toLowerCase()) && cat.code === selectedCategory
    )

    return isCategoryMatch ? jobRoleList : filteredRoles
  }, [jobRoleList, filteredRoles, searchQuery, selectedCategory])

  const onClose = () => {
    setModal('isJobRoleModalOpen', false)
  }

  return (
    <Modal customClassName={'desktop:w-[860px] tablet:w-[680px]'} isOpen={isJobRoleModalOpen} onClose={onClose}>
      <Modal.Header
        rightElement={
          <Button onClick={onReset} size={'sm'} customClassName={'w-[70px]'} variant={'outline'}>
            {t('modal:footer_buttons.reset')}
          </Button>
        }
      >
        <Label label={t('modal:job_role.header')} type={'titleMd'} />
      </Modal.Header>

      <Modal.Body>
        <div className="flex flex-col gap-y-4">
          <TextInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            status={'default'}
            placeholder={t('filter:filter.jobRoleFilter.jobRoleSearchPlaceHolder')}
          />
          <section className="border-gray2 flex h-[500px] gap-x-3 rounded-[12px] border bg-white p-3">
            {/* 왼쪽: 직군 리스트 */}
            <div className="flex w-[50%] flex-shrink-0 flex-col gap-y-2 overflow-y-scroll">
              {(searchQuery ? filteredCategories : JOB_CATEGORY_LIST).map((jobCategory) => (
                <button
                  type={'button'}
                  onClick={() => setSelectedJobCategory(jobCategory.code)}
                  className={`${
                    jobCategory.code === selectedCategory
                      ? 'border-main-500 bg-main-100 text-main-500 rounded-[12px] border'
                      : ''
                  } kr-button text-gray5 flex h-[36px] w-full flex-shrink cursor-pointer items-center justify-center py-3 whitespace-nowrap transition hover:opacity-80`}
                  key={jobCategory.code}
                >
                  {t(jobCategory.label)}
                </button>
              ))}
            </div>

            <div className="border-gray2 border-r" />

            {/* 오른쪽: 직무 리스트 */}
            <div className="flex w-full flex-col gap-y-1 overflow-y-scroll">
              {displayedRoles.length > 0
                ? displayedRoles.map((jobRole) => (
                    <button
                      type="button"
                      onClick={() => addJobRoles(jobRole.code)}
                      className={`kr-button text-gray5 flex h-[36px] w-full cursor-pointer items-center justify-between rounded-[8px] px-2 py-3 text-start whitespace-nowrap transition hover:opacity-80 ${
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
                : searchQuery && (
                    <p className="p-4 text-sm text-gray-400">{t('modal:job_role.body.message.no_search_result')}</p>
                  )}
            </div>
          </section>

          {/* 선택된 직무 태그 영역 */}
          <section className="flex gap-x-2 overflow-x-scroll">
            {selectedJobRoles?.map((selectedJobRole) => (
              <button
                onClick={() => deleteJobRoles(selectedJobRole)}
                type="button"
                key={selectedJobRole}
                className="border-gray3 bg-gray1 kr-badge-sm text-gray5 flex cursor-pointer items-center rounded-full border px-3 py-2 whitespace-nowrap transition hover:opacity-80"
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
          {t('modal.footer_buttons.close')}
        </Button>
        <Button onClick={onApply}>{t('modal.footer_buttons.completed')}</Button>
      </Modal.Footer>
    </Modal>
  )
}
