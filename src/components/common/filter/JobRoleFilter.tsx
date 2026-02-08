'use client'

import { DropDownGray3Icon, DropDownGray4Icon } from '@/assets/svgComponents'
import JobRoleModal from '@/components/common/modal/JobRoleModal'
import { useModalStore } from '@/store/modalStore'
import { useState } from 'react'
import { JobCategoryType, JobRoleType } from '@/types/job-post'
import { useTranslation } from 'react-i18next'
import { useFilterStore } from '@/store/filterStore'

export default function JobRoleFilter() {
  const { isJobRoleModalOpen, setIsJobRoleModalOpen } = useModalStore((state) => state)
  const [selectedJobCategory, setSelectedJobCategory] = useState<JobCategoryType | undefined>(undefined)
  const [selectedJobRoles, setSelectedJobRoles] = useState<JobRoleType[]>([])

  const { setSelectedJobRoleFilterList, selectedJobRoleFilterContentList } = useFilterStore((state) => state)

  const { t } = useTranslation()

  const deleteJobRoles = (selectedJobRole: JobRoleType) => {
    setSelectedJobRoles((prev) => prev?.filter((role) => role !== selectedJobRole))
  }

  const addJobRoles = (selectedJobRole: JobRoleType) => {
    setSelectedJobRoles((prev) => {
      const current = prev || []

      if (current.includes(selectedJobRole)) {
        return current.filter((role) => role !== selectedJobRole)
      }

      if (current.length >= 5) return prev

      return [...current, selectedJobRole]
    })
  }

  const onApply = () => {
    setSelectedJobRoleFilterList(selectedJobRoles)

    onClose()
  }

  const onReset = () => {
    setSelectedJobCategory(undefined)
    setSelectedJobRoles([])
    setSelectedJobRoleFilterList([])
  }

  const onClose = () => {
    setIsJobRoleModalOpen(isJobRoleModalOpen)
  }

  return (
    <div>
      {isJobRoleModalOpen && (
        <JobRoleModal
          selectedJobRoles={selectedJobRoles}
          deleteJobRoles={deleteJobRoles}
          setSelectedJobCategory={setSelectedJobCategory}
          addJobRoles={addJobRoles}
          onReset={onReset}
          onApply={onApply}
          selectedCategory={selectedJobCategory}
        />
      )}
      <button
        onClick={() => {
          setIsJobRoleModalOpen(isJobRoleModalOpen)
        }}
        className="hover:border-gray3 border-gray2 flex h-[36px] cursor-pointer items-center gap-x-2 rounded-[12px] border px-4 whitespace-nowrap transition hover:duration-75"
      >
        <div className="kr-button text-gray5 flex items-center gap-x-1">
          {t('recruitHome.filters.jobRoles')}
          {selectedJobRoleFilterContentList?.length === 0 ? null : (
            <div className="kr-badge-sm bg-main-500 flex h-[20px] w-[20px] items-center justify-center rounded-full text-white">
              {selectedJobRoleFilterContentList?.length}
            </div>
          )}
        </div>
        {isJobRoleModalOpen ? (
          <DropDownGray3Icon width={20} height={20} />
        ) : (
          <DropDownGray4Icon width={20} height={20} />
        )}
      </button>
    </div>
  )
}
