'use client'

import { Badge, BottomBorder } from '@/components/common'
import Image from 'next/image'
import { ContractEnumType, JobCategoryType, JobRoleType, LanguageType, VisaType } from '@/types/job-post'
import { formatToShortDateWithDay } from '@/utils/common'
import { useTranslation } from 'react-i18next'
import { convertEnumToKorContractTypeLabel } from '@/utils/job-post'
import { getJobCategoryLabel, getJobRoleLabel, getLanguageLabel, getVisaLabel } from '@/utils/filterList'
import { useModalStore } from '@/store/modalStore'
import { useState } from 'react'
import ImageModal from '@/components/common/modal/ImageModal'

interface JobPostSummaryProps {
  visas: VisaType[]
  languageTypes: LanguageType[]
  jobRoles: JobRoleType[]
  JobCategoryTypes: JobCategoryType[]
  contractType: ContractEnumType

  title: string
  companyImageUrl: string
  companyName: string
  recruitEndDate: string

  zipcode: string
  address1: string
  address2: string
}

export default function JobPostSummary({
  visas,
  companyImageUrl,
  companyName,
  recruitEndDate,
  title,
  languageTypes,
  contractType,
  zipcode,
  jobRoles,
  address2,
  address1,
  JobCategoryTypes,
}: JobPostSummaryProps) {
  const { t } = useTranslation()

  const { isImageModalOpen, setIsImageModalOpen } = useModalStore((state) => state)
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | undefined | null>('')

  return (
    <div className="border-gray2 flex flex-col gap-y-[20px] rounded-[12px] border p-4">
      {isImageModalOpen && <ImageModal setSelectedImageUrl={setSelectedImageUrl} ImageUrl={selectedImageUrl} />}

      <section className="flex flex-col gap-y-2">
        <div className="flex items-center justify-between">
          <div className="flex gap-x-2">
            {visas.length > 0 ? (
              visas.length === 1 ? (
                <Badge>{visas[0]}</Badge>
              ) : visas.length > 1 ? (
                <Badge>{`${visas[0]} 외 ${visas.length - 1} 가능`}</Badge>
              ) : null
            ) : null}

            {languageTypes.length > 0 ? (
              languageTypes.length === 1 ? (
                <Badge>{t(getLanguageLabel(languageTypes[0]))}</Badge>
              ) : languageTypes.length > 1 ? (
                <Badge>{`${t(getLanguageLabel(languageTypes[0]))} 외 ${languageTypes.length - 1}`}</Badge>
              ) : null
            ) : null}
          </div>
          <p className="kr-button text-gray4">{formatToShortDateWithDay(recruitEndDate)}</p>
        </div>

        <h1 className="kr-subtitle-lg">{title}</h1>
        <div className="flex items-center gap-x-2">
          <div
            onClick={() => {
              setIsImageModalOpen(isImageModalOpen)
              setSelectedImageUrl(companyImageUrl)
            }}
            className="relative h-[28px] w-[28px]"
          >
            <Image src={companyImageUrl} alt={'회사 로고'} fill className="rounded-[8px] object-cover" />
          </div>
          <p className="kr-small text-gray5">{companyName}</p>
        </div>
      </section>
      <BottomBorder />
      <section className="flex flex-col gap-y-3">
        <div className="flex items-center gap-x-1">
          <div className="kr-subtitle-md text-gray4 w-[80px] shrink-0 whitespace-nowrap">직종</div>
          {JobCategoryTypes?.map((JobCategoryType) => (
            <p key={JobCategoryType} className="kr-body-md">
              {`${t(getJobCategoryLabel(JobCategoryType))}`}
            </p>
          ))}
        </div>

        <div className="flex items-center gap-x-1">
          <div className="kr-subtitle-md text-gray4 w-[80px] shrink-0 whitespace-nowrap">직무</div>
          {jobRoles.map((jobRole) => (
            <p key={jobRole} className="kr-body-md">
              {`${t(getJobRoleLabel(jobRole))}`}
            </p>
          ))}
        </div>

        <div className="flex items-center gap-x-1">
          <div className="kr-subtitle-md text-gray4 w-[80px] shrink-0 whitespace-nowrap">고용형태</div>
          <p className="kr-body-md">{t(convertEnumToKorContractTypeLabel(contractType))}</p>
        </div>

        {visas.length > 0 ? (
          <div className="flex items-center gap-x-1">
            <div className="kr-subtitle-md text-gray4 w-[80px] shrink-0 whitespace-nowrap">비자</div>

            <div className="flex flex-wrap items-center gap-x-1">
              {visas.map((visa, index) => {
                const isLast = visas.length - 1 === index
                return (
                  <p key={visa} className="kr-body-md">
                    {`${t(getVisaLabel(visa))}`}
                    {isLast ? '' : ','}
                  </p>
                )
              })}
            </div>
          </div>
        ) : null}

        {languageTypes.length > 0 ? (
          <div className="flex items-center gap-x-1">
            <div className="kr-subtitle-md text-gray4 w-[80px]">언어</div>

            {languageTypes.map((languageType, index) => {
              const isLast = languageTypes.length - 1 === index
              return (
                <p key={languageType} className="kr-body-md">
                  {`${t(getLanguageLabel(languageType))}`}
                  {isLast ? '' : ','}
                </p>
              )
            })}
          </div>
        ) : null}

        {!(address1 && zipcode && address2) ? null : (
          <div className="flex items-center gap-x-1">
            <div className="kr-subtitle-md text-gray4 w-[80px]">근무지</div>
            <p className="kr-body-md">{`${zipcode ? `(${zipcode})` : ''} ${address1 ? `${address1}` : ''} ${address2 ? `${address2}` : ''}`}</p>
          </div>
        )}
      </section>
    </div>
  )
}
