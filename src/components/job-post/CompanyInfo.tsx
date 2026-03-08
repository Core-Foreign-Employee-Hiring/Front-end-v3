'use client'

import { Label } from '@/components/common'
import Image from 'next/image'
import Link from 'next/link'
import { CompanyType } from '@/types/job-post'
import { useTranslation } from 'react-i18next'
import { changeCompanyTypeEnumToKor } from '@/utils/filterList'
import ImageModal from '@/components/common/modal/ImageModal'
import { useModalStore } from '@/store/modalStore'
import { useState } from 'react'

interface CompanyInfoProps {
  companyImageUrl: string
  companyName: string
  businessType: string
  companyIntroduction: string
  companyType: CompanyType
  establishedDate: string
  representativeName: string
  companyZipcode: string
  companyAddress1: string
  companyAddress2: string
  websiteUrl: string
}

export default function CompanyInfo({
  companyName,
  companyType,
  businessType,
  companyImageUrl,
  representativeName,
  establishedDate,
  companyIntroduction,
  companyAddress1,
  companyAddress2,
  companyZipcode,
  websiteUrl,
}: CompanyInfoProps) {
  const { t } = useTranslation(['jobPost'])
  const { toggleModal, modals } = useModalStore((state) => state)
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | undefined | null>('')

  return (
    <div className="flex flex-col gap-y-2">
      {modals.isImageModalOpen && <ImageModal setSelectedImageUrl={setSelectedImageUrl} ImageUrl={selectedImageUrl} />}

      <Label label={t('jobPost:detail.companyInfo.title')} />
      <section className="bg-gray1 flex flex-col gap-y-4 rounded-[12px] p-4">
        <div className="flex gap-x-2">
          <div
            onClick={() => {
              toggleModal('isImageModalOpen')
              setSelectedImageUrl(companyImageUrl)
            }}
            className="relative h-[48px] w-[48px]"
          >
            <Image src={companyImageUrl} alt={'썸네일'} fill className="rounded-[10px] object-cover" />
          </div>
          <div className="flex flex-col gap-y-1">
            <p className="kr-title-sm">{companyName}</p>
            <p className="kr-body-md text-gray5">{businessType}</p>
          </div>
        </div>

        {companyIntroduction ? (
          <div className="flex">
            <div className="kr-body-md text-gray4 w-[80px] shrink-0 whitespace-pre-wrap">
              {t('jobPost:detail.companyInfo.companyIntroduction')}
            </div>
            <p className="kr-subtitle-md text-gray5">{companyIntroduction}</p>
          </div>
        ) : null}

        <div className="flex flex-col gap-y-3">
          {representativeName ? (
            <div className="flex">
              <div className="kr-body-md text-gray4 w-[80px] shrink-0">
                {t('jobPost:detail.companyInfo.representativeName')}
              </div>
              <p className="kr-subtitle-md text-gray5">{representativeName}</p>
            </div>
          ) : null}

          {establishedDate ? (
            <div className="flex">
              <div className="kr-body-md text-gray4 w-[80px] shrink-0">
                {t('jobPost:detail.companyInfo.establishedDate')}
              </div>
              <p className="kr-subtitle-md text-gray5">{establishedDate}</p>
            </div>
          ) : null}

          {companyType ? (
            <div className="flex">
              <div className="kr-body-md text-gray4 w-[80px] shrink-0">
                {t('jobPost:detail.companyInfo.companyType.title')}
              </div>
              <p className="kr-subtitle-md text-gray5">{t(changeCompanyTypeEnumToKor(companyType))}</p>
            </div>
          ) : null}

          {!(companyZipcode && companyAddress1) ? null : (
            <div className="flex">
              <div className="kr-body-md text-gray4 w-[80px] shrink-0">
                {t('jobPost:detail.companyInfo.companyAddress')}
              </div>
              <p className="kr-subtitle-md text-gray5">
                {[`(${companyZipcode})`, companyAddress1, companyAddress2].filter(Boolean).join(' ')}
              </p>
            </div>
          )}

          {websiteUrl ? (
            <div className="flex">
              <div className="kr-body-md text-gray4 w-[80px] shrink-0">{t('jobPost:detail.companyInfo.webSite')}</div>
              <Link href={websiteUrl} className="kr-subtitle-md text-gray5 underline decoration-1 underline-offset-4">
                {websiteUrl}
              </Link>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  )
}
