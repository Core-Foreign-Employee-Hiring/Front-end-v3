'use client'

import { Badge } from '@/components/common'
import Image from 'next/image'
import { LocationIcon } from '@/assets/svgComponents'
import { JobPostType } from '@/types/job-post'
import { useRouter } from 'next/navigation'
import { formatToShortDateWithDay, getShortAddress } from '@/utils/common'
import { getJobRoleLabel } from '@/utils/filterList'
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
  const { t } = useTranslation()
  return (
    <div
      onClick={() => {
        router.push(`/job-post/${recruitId}`)
      }}
      className="border-gray2 hover:border-gray3 flex cursor-pointer flex-col gap-y-3 rounded-[12px] border p-4 transition active:scale-95"
    >
      <section className="flex gap-x-2">
        <Badge>비자</Badge>
        <Badge>언어 숙련도</Badge>
      </section>
      <section>
        <h2 className="kr-subtitle-md line-clamp-2 h-[52px] overflow-hidden">{title}</h2>
        <div className="kr-body-sm text-gray5 mt-1 flex gap-x-2">
          {jobRoles?.map((jobRole) => (
            <p key={jobRole}>{t(getJobRoleLabel(jobRole))}</p>
          ))}
          <p>・</p>
          <p>{directInputCarrerType}</p>
          <p>・</p>
          <p>{carrerType}</p>
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
        <p className="kr-button text-gray4">{formatToShortDateWithDay(recruitEndDate)}</p>
      </section>
    </div>
  )
}
