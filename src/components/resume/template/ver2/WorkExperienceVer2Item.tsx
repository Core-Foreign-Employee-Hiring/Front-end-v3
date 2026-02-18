'use client'

import { ResumeCareerType } from '@/types/resume'
import { convertEnumToKorContractTypeLabel } from '@/utils/job-post'
import { useTranslation } from 'react-i18next'

interface WorkExperienceVer2ItemProps {
  career: ResumeCareerType
}
export default function WorkExperienceVer2Item({ career }: WorkExperienceVer2ItemProps) {
  const { t } = useTranslation()
  return (
    <div className="desktop:flex-row desktop:ml-[12px] border-main-500 desktop:pb-[32px] flex flex-col gap-x-[20px] gap-y-2 border-l-[2px] pb-[24px] pl-[20px]">
      <div className="flex w-[300px] shrink-0 flex-col gap-y-2">
        <p className="kr-title-md">{career.companyName}</p>
        <p className="desktop:text-black desktop:block kr-body-sm hidden">
          {career.startDate} - {career.endDate ? career.endDate : '근무중'}
        </p>
      </div>
      <div className="flex flex-col gap-y-2">
        <p className="kr-subtitle-lg">
          {career.position} | {t(convertEnumToKorContractTypeLabel(career.contractType))}
        </p>
        <p className="text-gray5 kr-body-sm desktop:hidden block">
          {career.startDate} - {career.endDate ? career.endDate : '근무중'}
        </p>
        <p className="kr-body-md">{career.highlight}</p>
      </div>
    </div>
  )
}
