'use client'

import { Button, Label } from '@/components/common'
import { useTranslation } from 'react-i18next'
import { useModalStore } from '@/store/modalStore'
import { JobCategoryType, JobRoleType } from '@/types/job-post'
import { useState } from 'react'
import { useCreateJobPostStore } from '@/store/createJobPostStore'
import { getJobRoleLabel, getSelectedCategoriesFromRoles } from '@/utils/filterList'
import JobRoleModal from '@/components/common/modal/JobRoleModal'

export default function JobRole() {
  const { isJobRoleModalOpen, setIsJobRoleModalOpen } = useModalStore((state) => state)
  const [selectedJobCategory, setSelectedJobCategory] = useState<JobCategoryType | undefined>(undefined)
  const [selectedJobRoles, setSelectedJobRoles] = useState<JobRoleType[]>([])
  const { updateCreateJobPost, createJobPost } = useCreateJobPostStore((state) => state)

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
    updateCreateJobPost('jobRoles', selectedJobRoles)
    updateCreateJobPost('jobCategories', getSelectedCategoriesFromRoles(selectedJobRoles))

    onClose()
  }

  const onReset = () => {
    setSelectedJobCategory(undefined)
    setSelectedJobRoles([])
    updateCreateJobPost('jobRoles', [])
  }

  const onClose = () => {
    setIsJobRoleModalOpen(isJobRoleModalOpen)
  }

  return (
    <div>
      {isJobRoleModalOpen && (
        <JobRoleModal
          onApply={onApply}
          onReset={onReset}
          selectedJobRoles={selectedJobRoles}
          addJobRoles={addJobRoles}
          setSelectedJobCategory={setSelectedJobCategory}
          deleteJobRoles={deleteJobRoles}
          selectedCategory={selectedJobCategory}
        />
      )}
      <div className="flex flex-col">
        <Label label={'직무 선택'} isRequired={true} type={'titleSm'} />
        <div className="flex flex-col gap-y-3">
          {createJobPost.jobRoles ? (
            <div className="flex gap-x-2">
              {createJobPost.jobRoles?.map((jobRole) => (
                <button
                  type="button"
                  key={jobRole}
                  className="border-gray3 bg-gray1 badge-sm text-gray5 flex cursor-pointer items-center rounded-full border px-3 py-2 whitespace-nowrap"
                >
                  {t(getJobRoleLabel(jobRole))}
                </button>
              ))}
            </div>
          ) : null}
          <Button variant={'outline'} size={'md'} onClick={onClose} customClassName={'w-[156px]'} buttonType={'button'}>
            직무 선택
          </Button>
        </div>
      </div>
    </div>
  )
}
