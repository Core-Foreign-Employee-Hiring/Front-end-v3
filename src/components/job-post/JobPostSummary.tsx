'use client'

import { Badge, BottomBorder } from '@/components/common'
import Image from 'next/image'
import { CarrerType, ContractEnumType, JobCategoryType, JobRoleType, LanguageType, VisaType } from '@/types/job-post'
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
  carrerType: CarrerType
  directInputCarrerType: string
  jobRoles: JobRoleType[]
  JobCategoryTypes: JobCategoryType[]
  contractType: ContractEnumType
  title: string
  companyImageUrl: string
  companyName: string
  recruitEndDate: string
  workZipcode: string
  workAddress1: string
  workAddress2: string
  isAlwaysRecruiting: boolean
}

export default function JobPostSummary({
  visas,
  carrerType,
  directInputCarrerType,
  companyImageUrl,
  companyName,
  recruitEndDate,
  title,
  languageTypes,
  contractType,
  workZipcode,
  jobRoles,
  workAddress2,
  workAddress1,
  JobCategoryTypes,
  isAlwaysRecruiting,
}: JobPostSummaryProps) {
  const { t } = useTranslation(['jobPost', 'common', 'filter'])
  const { toggleModal, modals } = useModalStore((state) => state)
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | undefined | null>('')

  return (
    <div className="border-gray2 flex flex-col gap-y-[20px] rounded-[12px] border p-4">
      {modals.isImageModalOpen && <ImageModal setSelectedImageUrl={setSelectedImageUrl} ImageUrl={selectedImageUrl} />}

      <section className="flex flex-col gap-y-2">
        <div className="flex items-center justify-between">
          <div className="flex gap-x-2">
            {visas.length > 0 ? (
              <Badge>
                {visas.length === 1
                  ? visas[0]
                  : t('jobPost:detail.jobPostSummary.visaBadge.others', {
                      main: visas[0],
                      count: visas.length - 1,
                    })}
              </Badge>
            ) : null}

            {languageTypes.length > 0 ? (
              languageTypes.length === 1 ? (
                <Badge>{t(getLanguageLabel(languageTypes[0]))}</Badge>
              ) : languageTypes.length > 1 ? (
                <Badge>
                  {t('jobPost:detail.jobPostSummary.languageBadge.others', {
                    main: t(getLanguageLabel(languageTypes[0])),
                    count: languageTypes.length - 1,
                  })}
                </Badge>
              ) : null
            ) : null}
          </div>
          {isAlwaysRecruiting ? (
            <p className="kr-button text-gray4">{t('jobPost:detail.jobPostSummary.isAlwaysRecruiting')}</p>
          ) : (
            <p className="kr-button text-gray4">{formatToShortDateWithDay(recruitEndDate, t)}</p>
          )}
        </div>

        <h1 className="kr-subtitle-lg">{title}</h1>
        <div className="flex items-center gap-x-2">
          <div
            onClick={() => {
              toggleModal('isImageModalOpen')
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
        {JobCategoryTypes.length !== 0 ? (
          <div className="flex items-center gap-x-1">
            <div className="kr-subtitle-md text-gray4 w-[80px] shrink-0 whitespace-nowrap">
              {t('jobPost:detail.jobPostSummary.jobCategory')}
            </div>
            {JobCategoryTypes?.map((JobCategoryType, index) => {
              const isLast = JobCategoryTypes.length - 1 === index
              return (
                <p key={JobCategoryType} className="kr-body-md">
                  {t(getJobCategoryLabel(JobCategoryType))}
                  {isLast ? '' : ','}
                </p>
              )
            })}
          </div>
        ) : null}

        <div className="flex items-center gap-x-1">
          <div className="kr-subtitle-md text-gray4 w-[80px] shrink-0 whitespace-nowrap">
            {t('jobPost:detail.jobPostSummary.jobRole')}
          </div>
          {jobRoles.map((jobRole, index) => {
            const isLast = jobRoles.length - 1 === index
            return (
              <p key={jobRole} className="kr-body-md">
                {`${t(getJobRoleLabel(jobRole))}`}
                {isLast ? '' : ','}
              </p>
            )
          })}
        </div>

        <div className="flex items-center gap-x-1">
          <div className="kr-subtitle-md text-gray4 w-[80px] shrink-0 whitespace-nowrap">
            {t('jobPost:detail.jobPostSummary.career')}
          </div>
          <div className="flex items-center gap-x-1">
            <p className="kr-body-md">{t(convertEnumToKorContractTypeLabel(carrerType))}</p>
            {directInputCarrerType ? (
              <>
                <p className="kr-body-md">|</p>
                <p className="kr-body-md">{directInputCarrerType}</p>
              </>
            ) : null}
          </div>
        </div>

        <div className="flex items-center gap-x-1">
          <div className="kr-subtitle-md text-gray4 w-[80px] shrink-0 whitespace-nowrap">
            {t('jobPost:detail.jobPostSummary.contractType')}
          </div>
          <p className="kr-body-md">{t(convertEnumToKorContractTypeLabel(contractType))}</p>
        </div>

        {visas.length > 0 ? (
          <div className="flex items-center gap-x-1">
            <div className="kr-subtitle-md text-gray4 w-[80px] shrink-0 whitespace-nowrap">
              {t('jobPost:detail.jobPostSummary.visa')}
            </div>

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
            <div className="kr-subtitle-md text-gray4 w-[80px] shrink-0 whitespace-nowrap">
              {t('jobPost:detail.jobPostSummary.language')}
            </div>

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

        {!(workAddress1 && workZipcode) ? null : (
          <div className="flex items-center gap-x-1">
            <div className="kr-subtitle-md text-gray4 w-[80px] shrink-0 whitespace-nowrap">
              {t('jobPost:detail.jobPostSummary.workAddress')}
            </div>
            <p className="kr-body-md">{[`(${workZipcode})`, workAddress1, workAddress2].filter(Boolean).join(' ')}</p>
          </div>
        )}
      </section>
    </div>
  )
}
