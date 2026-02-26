'use client'
import { Button, Label, TextInput } from '@/components/common'
import { JobCategoryType, JobRoleType } from '@/types/job-post'
import { useTranslation } from 'react-i18next'
import { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { useModalStore } from '@/store/modalStore'
import { getJobRoleLabel, getJobRoleList, JOB_CATEGORY_LIST } from '@/utils/filterList'
import { CheckIcon, Gray5XIcon, UncheckIcon } from '@/assets/svgComponents'

interface MobileJobRoleModalProps {
  selectedCategory: JobCategoryType | undefined
  setSelectedJobCategory: Dispatch<SetStateAction<JobCategoryType | undefined>>
  selectedJobRoles: JobRoleType[] | undefined
  deleteJobRoles: (selectedJobRole: JobRoleType) => void
  addJobRoles: (selectedJobRole: JobRoleType) => void
  onApply: () => void
  onReset: () => void
}

export default function MobileJobRoleModal({
  selectedCategory,
  setSelectedJobCategory,
  selectedJobRoles,
  deleteJobRoles,
  addJobRoles,
  onApply,
  onReset,
}: MobileJobRoleModalProps) {
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
    <div className="desktop:hidden tablet:hidden fixed inset-0 z-80 flex h-full w-full flex-col gap-y-[24px] overflow-y-auto bg-white p-5">
      <section className="flex items-center justify-between">
        <Label label={t('modal:job_role.header')} type={'titleMd'} />
        <Gray5XIcon className="cursor-pointer" onClick={onClose} width={24} height={24} />
      </section>
      <div className="flex flex-col gap-y-4">
        <TextInput
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          status={'default'}
          placeholder={t('filter.jobRoleFilter.jobRoleSearchPlaceHolder')}
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

      <div className="fixed bottom-0 left-0 z-80 flex w-full gap-x-2 bg-white px-5 py-[24px]">
        <Button onClick={onReset} size={'lg'} variant={'outline'}>
          {t('modal:footer_buttons.reset')}
        </Button>
        <Button onClick={onApply}>{t('modal:footer_buttons.completed')}</Button>
      </div>
    </div>
  )
}
