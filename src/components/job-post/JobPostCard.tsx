'use client'

import { Badge } from '@/components/common'
import Image from 'next/image'
import { LocationIcon } from '@/assets/svgComponents'
import { JobPostType } from '@/types/job-post'
import { useRouter } from 'next/navigation'
import { formatToShortDateWithDay, getShortAddress } from '@/utils/common'
import { getJobRoleLabel, getLanguageLabel } from '@/utils/filterList'
import { useTranslation } from 'react-i18next'

export default function JobPostCard({
  recruitId,
  companyImageUrl,
  companyName,
  recruitEndDate,
  title,
  jobRoles,
  directInputCarrerType,
  carrerType,
  languageTypes,
  visas,
  workAddress1,
}: JobPostType) {
  const router = useRouter()
  const { t } = useTranslation(['jobPost'])
  return (
    <div
      onClick={() => {
        router.push(`/job-post/${recruitId}`)
      }}
      className="border-gray2 hover:border-gray3 flex cursor-pointer flex-col gap-y-3 rounded-[12px] border p-4 transition active:scale-95"
    >
      <section className="flex gap-x-2">
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
      </section>

      <section>
        <h2 className="kr-subtitle-md line-clamp-2 h-[52px] overflow-hidden">{title}</h2>
        <div className="kr-body-sm text-gray5 mt-1 flex gap-x-2">
          {jobRoles.length > 0 ? (
            jobRoles.length === 1 ? (
              <p>{t(getJobRoleLabel(jobRoles[0]))}</p>
            ) : jobRoles.length > 1 ? (
              <p>
                {t('jobPost:home.jobPostCard.jobRoles.others', {
                  main: t(getJobRoleLabel(jobRoles[0])),
                  count: jobRoles.length - 1,
                })}
              </p>
            ) : null
          ) : null}
          {directInputCarrerType ? (
            <>
              <p>・</p>
              <p>{directInputCarrerType}</p>
            </>
          ) : null}
          {carrerType ? (
            <>
              <p>・</p>
              <p>{carrerType}</p>
            </>
          ) : null}
        </div>
        <div className="mt-2 flex items-center gap-x-2">
          <div className="relative h-[28px] w-[28px]">
            <Image src={companyImageUrl} alt={'회사로고'} fill className="rounded-[8px] object-cover" />
          </div>
          <p className="kr-small text-gray5">{companyName}</p>
        </div>
      </section>
      <section className="flex justify-between">
        <div className="flex gap-x-1">
          <LocationIcon width={13} height={16} />
          <p className="kr-button text-gray4">{`${getShortAddress(workAddress1)}`}</p>
        </div>
        <p className="kr-button text-gray4">{formatToShortDateWithDay(recruitEndDate, t)}</p>
      </section>
    </div>
  )
}
