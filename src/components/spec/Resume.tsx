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
import { useTranslation } from 'react-i18next'

interface ResumeProps {
  resumeList: ResumeListType[] | undefined
  lang: string
}

export default function Resume({ lang, resumeList }: ResumeProps) {
  const { t } = useTranslation('resume')
  const { toggleModal, modals, setModal } = useModalStore((state) => state)

  useEffect(() => {
    clientFetchSpecData().then((res) => {
      if (res.success) {
        // 데이터가 성공적으로 왔다면 모달을 닫아줌 (초기화)
        setModal('isNotUseResumeService', false)
      } else {
        // 데이터가 없거나 실패했을 때만 모달을 띄움
        setModal('isNotUseResumeService', true)
      }
    })
  }, [setModal])

  return (
    <div>
      {modals.isNotUseResumeService && <NotUseResumeServiceModal lang={lang} />}
      {modals.isCreateResumeModalOpen && <CreateResumeModal />}
      {modals.isCreateResumeModalOpen && <MobileCreateResumeModal lang={lang} />}

      {modals.isInfoPickerModalOpen && <InfoPickerModal />}
      <Label label={t('title')} type={'titleMd'} rightElement={<AddResumeButton />} />
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
