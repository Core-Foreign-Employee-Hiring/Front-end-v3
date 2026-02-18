'use client'

import { ResumeCareerType } from '@/types/resume'
import { convertEnumToKorContractTypeLabel } from '@/utils/job-post'
import { useTranslation } from 'react-i18next'

interface WorkExperienceItemProps {
  isLast: boolean
  career: ResumeCareerType
}
export default function WorkExperienceItem({ isLast, career }: WorkExperienceItemProps) {
  const { t } = useTranslation()
  return (
    <div className={`${isLast ? '' : 'border-gray2 border-b pb-[24px]'} flex w-full flex-col items-start gap-y-2`}>
      <div className="tablet:justify-between desktop:justify-between desktop:flex-row tablet:flex-row flex w-full flex-col items-start gap-y-2">
        <div className="flex flex-col gap-y-2">
          <p className="desktop:kr-title-md tablet:kr-title-md kr-subtitle-lg">{career.companyName}</p>
          <p className="desktop:kr-subtitle-lg tablet:kr-subtitle-lg kr-subtitle-md">
            {career.position} {t(convertEnumToKorContractTypeLabel(career.contractType))}
          </p>
        </div>
        <p className="tablet:kr-body-sm desktop:kr-body-sm kr-small text-gray5">
          {career.startDate} - {career.endDate ? career.endDate : '현재 진행중'}
        </p>
      </div>

      <p className="desktop:kr-body-md tablet:kr-body-md kr-body-sm">{career.highlight}</p>
    </div>
  )
}
