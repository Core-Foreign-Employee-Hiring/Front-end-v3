'use client'
import { Label } from '@/components/common'
import { SalaryEnumType, WorkDayPatternType, WorkType } from '@/types/job-post'
import { changeEnumToKorWorkDaysTypeLabel, changeEnumToKorWorkTypeLabel } from '@/utils/filterList'
import { useTranslation } from 'react-i18next'
import SalaryTypeBadge from '@/components/common/SalaryTypeBadge'

interface WorkConditionsProps {
  workType: WorkType
  directInputWorkType: string
  workDayType: WorkDayPatternType
  directInputWorkDayType: string
  workStartTime: string
  workEndTime: string
  directInputWorkTime: string
  salaryType: SalaryEnumType
  salary: number
  directInputSalaryType: string
}

export default function WorkConditions({
  workType,
  directInputWorkDayType,
  directInputWorkTime,
  directInputSalaryType,
  workStartTime,
  salary,
  workEndTime,
  salaryType,
  directInputWorkType,
  workDayType,
}: WorkConditionsProps) {
  const { t } = useTranslation(['jobPost'])

  return (
    <div className="border-gray2 flex h-fit w-full flex-col gap-y-2 rounded-[12px] border p-4">
      <Label label={t('jobPost:detail.workConditions.title')} type={'subtitleLg'} />
      <div className="flex flex-col gap-y-[20px]">
        <div className="flex">
          <div className="text-gray4 kr-subtitle-md w-[80px]">{t('jobPost:detail.workConditions.workType.title')}</div>
          <div className="flex flex-col">
            <p className="kr-body-md">{t(changeEnumToKorWorkTypeLabel(workType))}</p>
            <p className="kr-body-sm text-gray5">{directInputWorkType}</p>
          </div>
        </div>

        <div className="flex">
          <div className="text-gray4 kr-subtitle-md w-[80px]">{t('jobPost:detail.workConditions.workTime')}</div>
          <div className="flex flex-col">
            <p className="kr-body-md">
              {workStartTime} ~ {workEndTime}
            </p>
            <p className="kr-body-sm text-gray5">{directInputWorkTime}</p>
          </div>
        </div>

        <div className="flex">
          <div className="text-gray4 kr-subtitle-md w-[80px]">
            {t('jobPost:detail.workConditions.workDaysType.title')}
          </div>
          <div className="flex flex-col">
            <p className="kr-body-md">{t(changeEnumToKorWorkDaysTypeLabel(workDayType))}</p>
            <p className="kr-body-sm text-gray5">{directInputWorkDayType}</p>
          </div>
        </div>

        <div className="flex">
          <div className="text-gray4 kr-subtitle-md w-[80px]">
            {t('jobPost:detail.workConditions.salaryType.title')}
          </div>
          <div className="flex flex-col">
            <div className="flex gap-x-1">
              <SalaryTypeBadge salaryType={salaryType} />
              <p className="kr-body-md">{salary}</p>
            </div>
            <p className="kr-body-sm text-gray5">{directInputSalaryType}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
