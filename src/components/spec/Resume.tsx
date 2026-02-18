'use client'

import { Label, Spacing } from '@/components/common'
import AddResumeButton from '@/components/resume/AddResumeButton'
import ResumeItem from '@/components/resume/ResumeItem'
import { useModalStore } from '@/store/modalStore'
import CreateResumeModal from '@/components/common/modal/CreateResumeModal'
import InfoPickerModal from '@/components/common/modal/InfoPickerModal'
import { ResumeListType } from '@/types/resume'
import MobileCreateResumeModal from '@/components/common/modal/mobile/MobileCreateResumeModal'
import { clientFetchSpecData } from '@/lib/client/spec'
import { useEffect } from 'react'
import NotUseResumeServiceModal from '@/components/common/modal/NotUseResumeServiceModal'

interface ResumeProps {
  resumeList: ResumeListType[] | undefined
  lang: string
}

export default function Resume({ lang, resumeList }: ResumeProps) {
  const { toggleModal, modals } = useModalStore((state) => state)

  useEffect(() => {
    clientFetchSpecData().then((res) => {
      if (!res.success) {
        toggleModal('isNotUseResumeService')
      }
    })
  }, [])

  return (
    <div>
      {modals.isNotUseResumeService && <NotUseResumeServiceModal lang={lang} />}
      {modals.isCreateResumeModalOpen && <CreateResumeModal />}
      {modals.isCreateResumeModalOpen && <MobileCreateResumeModal lang={lang} />}

      {modals.isInfoPickerModalOpen && <InfoPickerModal />}
      <Label label={'이력서'} type={'titleMd'} rightElement={<AddResumeButton />} />
      <Spacing height={12} />
      <div className="flex flex-col gap-y-3">
        {resumeList?.map((resume) => (
          <ResumeItem
            lang={lang}
            key={resume.resumeId}
            createdAt={resume.createdAt}
            modifiedAt={resume.updatedAt}
            title={resume.resumeName}
            resumeId={resume.resumeId}
          />
        ))}
      </div>
    </div>
  )
}
