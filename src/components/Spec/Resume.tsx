'use client'

import { Label, Spacing } from '@/components/common'
import AddResumeButton from '@/components/resume/AddResumeButton'
import ResumeItem from '@/components/resume/ResumeItem'
import { useModalStore } from '@/store/modalStore'
import CreateResumeModal from '@/components/common/modal/CreateResumeModal'
import InfoPickerModal from '@/components/common/modal/InfoPickerModal'

export default function Resume() {
  const { isCreateResumeModalOpen, isInfoPickerModalOpen } = useModalStore((state) => state)
  return (
    <div>
      {isCreateResumeModalOpen && <CreateResumeModal />}
      {isInfoPickerModalOpen && <InfoPickerModal />}
      <Label label={'이력서'} type={'titleMd'} rightElement={<AddResumeButton />}></Label>
      <Spacing height={12} />
      <ResumeItem />
    </div>
  )
}
