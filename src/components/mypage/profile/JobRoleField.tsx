'use client'

import { Button, Label } from '@/components/common'
import { useModalStore } from '@/store/modalStore'
import JobRoleModal from '@/components/common/modal/JobRoleModal'
import { useState } from 'react'
import { getJobRoleLabel } from '@/utils/filterList'
import { useTranslation } from 'react-i18next'
import { JobCategoryType, JobRoleType } from '@/types/job-post'
import { useModifyProfileStore } from '@/store/modifyProfileStore'

export default function JobRoleField() {
  const { isJobRoleModalOpen, setIsJobRoleModalOpen } = useModalStore((state) => state)
  const { modifyProfileData, updateProfile } = useModifyProfileStore((state) => state)
  const [selectedJobCategory, setSelectedJobCategory] = useState<JobCategoryType | undefined>(undefined)
  const [selectedJobRoles, setSelectedJobRoles] = useState<JobRoleType[]>()

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
    updateProfile('jobRoles', selectedJobRoles)

    onClose()
  }

  const onReset = () => {
    setSelectedJobCategory(undefined)
    setSelectedJobRoles(undefined)
    updateProfile('jobRoles', undefined)
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
      <div className="flex flex-col gap-y-2">
        <Label isRequired={true} label={'관심 직무'} type={'titleSm'} />
        <div className="flex flex-col gap-y-3">
          {modifyProfileData.jobRoles ? (
            <div className="flex gap-x-2">
              {modifyProfileData.jobRoles?.map((jobRole) => (
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
          <Button variant={'outline'} size={'lg'} onClick={onClose} buttonType={'button'}>
            직무 선택
          </Button>
        </div>
      </div>
    </div>
  )
}
