'use client'

import { Label, Spacing } from '@/components/common'
import AddResumeButton from '@/components/resume/AddResumeButton'
import ResumeItem from '@/components/resume/ResumeItem'
import { useModalStore } from '@/store/modalStore'
import CreateResumeModal from '@/components/common/modal/CreateResumeModal'
import InfoPickerModal from '@/components/common/modal/InfoPickerModal'
import { ResumeListType } from '@/types/resume'

interface ResumeProps {
  resumeList: ResumeListType[] | undefined
}

export default function Resume({ resumeList }: ResumeProps) {
  const { isCreateResumeModalOpen, isInfoPickerModalOpen } = useModalStore((state) => state)
  return (
    <div>
      {isCreateResumeModalOpen && <CreateResumeModal />}
      {isInfoPickerModalOpen && <InfoPickerModal />}
      <Label label={'이력서'} type={'titleMd'} rightElement={<AddResumeButton />}></Label>
      <Spacing height={12} />
      <div className="flex flex-col gap-y-3">
        {resumeList?.map((resume) => (
          <ResumeItem
            key={resume.resumeId}
            createdAt={resume.createdAt}
            modifiedAt={resume.updatedAt}
            title={resume.resumeName}
            id={resume.resumeId}
          />
        ))}
      </div>
    </div>
  )
}
