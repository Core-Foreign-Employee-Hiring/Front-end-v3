'use client'

import { Badge } from '@/components/common'
import { LocationIcon } from '@/assets/svgComponents'
import { JobPostType } from '@/types/job-post'
import { useRouter } from 'next/navigation'
import { formatToShortDateWithDay, getShortAddress } from '@/utils/common'
import { getJobRoleLabel, getLanguageLabel } from '@/utils/filterList'
import { useTranslation } from 'react-i18next'
import { convertEnumToKorContractTypeLabel } from '@/utils/job-post'
import Image from 'next/image'

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
      className="border-gray2 hover:border-gray3 flex h-[200px] cursor-pointer flex-col justify-between rounded-[12px] border p-4 transition active:scale-95"
    >
      <div className="flex flex-col gap-y-3">
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
          <h2 className="kr-subtitle-md line-clamp-2 overflow-hidden">{title}</h2>

          {/* 세 가지 중 하나라도 존재할 때만 렌더링 */}
          {(jobRoles.length > 0 || directInputCarrerType || carrerType) && (
            <div className="kr-body-sm text-gray5 mt-1 flex flex-wrap gap-x-1">
              {/* 1. 직무 정보 */}
              {jobRoles.length > 0 && (
                <p>
                  {jobRoles.length === 1
                    ? t(getJobRoleLabel(jobRoles[0]))
                    : t('jobPost:home.jobPostCard.jobRoles.others', {
                        main: t(getJobRoleLabel(jobRoles[0])),
                        count: jobRoles.length - 1,
                        interpolation: { escapeValue: false },
                      })}
                </p>
              )}

              {/* 2. 직접 입력 경력 (앞에 데이터가 있을 때만 불렛 표시) */}
              {directInputCarrerType && (
                <>
                  {jobRoles.length > 0 && <span>・</span>}
                  <p>{directInputCarrerType}</p>
                </>
              )}

              {/* 3. 공고 경력 (앞에 데이터가 있을 때만 불렛 표시) */}
              {carrerType && (
                <>
                  {(jobRoles.length > 0 || directInputCarrerType) && <span>・</span>}
                  <p>{t(convertEnumToKorContractTypeLabel(carrerType))}</p>
                </>
              )}
            </div>
          )}

          <div className="mt-2 flex items-center gap-x-2">
            <div className="relative h-[28px] w-[28px]">
              <Image src={companyImageUrl} alt={'회사로고'} fill className="rounded-[8px] object-cover" />
            </div>
            <p className="kr-small text-gray5">{companyName}</p>
          </div>
        </section>
      </div>

      <section className="flex justify-between">
        {workAddress1 ? (
          <div className="flex gap-x-1">
            <LocationIcon width={13} height={16} />
            <p className="kr-button text-gray4">{`${getShortAddress(workAddress1)}`}</p>
          </div>
        ) : null}
        <p className="kr-button text-gray4">{formatToShortDateWithDay(recruitEndDate, t)}</p>
      </section>
    </div>
  )
}
