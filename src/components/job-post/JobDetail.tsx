'use client'

import { Label } from '@/components/common'
import Image from 'next/image'
import { ApplicationMethodType } from '@/types/job-post'
import { getApplicationMethodLabel } from '@/utils/filterList'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-y-[20px]">
      <div className="flex flex-col gap-y-2">
        <Label label={'상세 정보'} type={'subtitleLg'} />
        <div className="relative h-full w-[752px]">
          <Image src={posterImageUrl} alt={'포스터'} fill className="object-cover" />
        </div>
      </div>

      <section className="flex flex-col gap-y-1">
        <p className="kr-title-sm">주요 업무</p>
        <p className="kr-body-md text-gray5">{mainTasks}</p>
      </section>

      <section className="flex flex-col gap-y-1">
        <p className="kr-title-sm">자격 요건</p>
        <p className="kr-body-md text-gray5">{qualifications}</p>
      </section>

      <section className="flex flex-col gap-y-1">
        <p className="kr-title-sm">우대사항</p>
        <p className="kr-body-md text-gray5">{preferences}</p>
      </section>

      <section className="flex flex-col gap-y-1">
        <p className="kr-title-sm">기타</p>
        <p className="kr-body-md text-gray5">{others}</p>
      </section>

      <section className="flex flex-col gap-y-1">
        <p className="kr-title-sm">지원 방식</p>
        <p className="kr-body-md text-gray5">{`${t(getApplicationMethodLabel(applicationMethod))}`}</p>
      </section>
    </div>
  )
}
