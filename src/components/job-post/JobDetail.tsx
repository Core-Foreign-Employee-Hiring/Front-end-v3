'use client'

import { Label } from '@/components/common'
import Image from 'next/image'
import { ApplicationMethodType } from '@/types/job-post'
import { getApplicationMethodLabel } from '@/utils/filterList'
import { useTranslation } from 'react-i18next'
import { useModalStore } from '@/store/modalStore'
import { useState } from 'react'
import ImageModal from '@/components/common/modal/ImageModal'

interface JobDetailProps {
  posterImageUrl: string
  mainTasks: string
  qualifications: string
  preferences: string
  others: string
  applicationMethod: ApplicationMethodType
}

export default function JobDetail({
  posterImageUrl,
  mainTasks,
  others,
  applicationMethod,
  qualifications,
  preferences,
}: JobDetailProps) {
  const { t } = useTranslation(['jobPost'])
  const { toggleModal, modals } = useModalStore((state) => state)
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | undefined | null>('')

  return (
    <div className="flex flex-col gap-y-[20px]">
      {modals.isImageModalOpen && <ImageModal setSelectedImageUrl={setSelectedImageUrl} ImageUrl={selectedImageUrl} />}

      <div className="flex flex-col gap-y-2">
        <Label label={t('jobPost:detail.jobDetail.title')} type={'subtitleLg'} />
        <div
          onClick={() => {
            toggleModal('isImageModalOpen')
            setSelectedImageUrl(posterImageUrl)
          }}
          className="relative h-full w-[752px]"
        >
          <Image src={posterImageUrl} alt={'포스터'} fill className="rounded-[12px] object-cover" />
        </div>
      </div>

      <section className="flex flex-col gap-y-1">
        <p className="kr-title-sm">{t('jobPost:detail.jobDetail.mainTasks')}</p>
        <p className="kr-body-md text-gray5">{mainTasks}</p>
      </section>

      <section className="flex flex-col gap-y-1">
        <p className="kr-title-sm">{t('jobPost:detail.jobDetail.qualifications')}</p>
        <p className="kr-body-md text-gray5">{qualifications}</p>
      </section>

      <section className="flex flex-col gap-y-1">
        <p className="kr-title-sm">{t('jobPost:detail.jobDetail.preferences')}</p>
        <p className="kr-body-md text-gray5">{preferences}</p>
      </section>

      <section className="flex flex-col gap-y-1">
        <p className="kr-title-sm">{t('jobPost:detail.jobDetail.others')}</p>
        <p className="kr-body-md text-gray5">{others}</p>
      </section>

      <section className="flex flex-col gap-y-1">
        <p className="kr-title-sm">{t('jobPost:detail.jobDetail.applicationMethod.title')}</p>
        <p className="kr-body-md text-gray5">{`${t(getApplicationMethodLabel(applicationMethod))}`}</p>
      </section>
    </div>
  )
}
