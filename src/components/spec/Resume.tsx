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
import EmptyState from '@/components/common/EmptyState' // EmptyState 임포트

interface ResumeProps {
  resumeList: ResumeListType[] | undefined
  lang: string
}

export default function Resume({ lang, resumeList }: ResumeProps) {
  const { t } = useTranslation('resume')
  const { modals, setModal } = useModalStore((state) => state)

  useEffect(() => {
    clientFetchSpecData().then((res) => {
      if (res.success) {
        setModal('isNotUseResumeService', false)
      } else {
        setModal('isNotUseResumeService', true)
      }
    })
  }, [setModal])

  // 데이터 존재 여부 확인
  const hasResumes = resumeList && resumeList.length > 0

  return (
    <div>
      {modals.isNotUseResumeService && <NotUseResumeServiceModal lang={lang} />}
      {modals.isCreateResumeModalOpen && <CreateResumeModal />}
      {modals.isCreateResumeModalOpen && <MobileCreateResumeModal lang={lang} />}
      {modals.isInfoPickerModalOpen && <InfoPickerModal />}

      <Label label={t('title')} type={'titleMd'} rightElement={<AddResumeButton />} />
      <Spacing height={12} />

      {/* 데이터 유무에 따른 조건부 렌더링 */}
      {!hasResumes ? (
        <EmptyState icon="📄" title={t('empty.title')} description={t('empty.description')} />
      ) : (
        <div className="flex flex-col gap-y-3">
          {resumeList.map((resume) => (
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
      )}
    </div>
  )
}
