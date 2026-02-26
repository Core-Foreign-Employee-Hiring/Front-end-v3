'use client'

import { convertEnumToKorSalaryTypeLabel } from '@/utils/filterList'
import { SalaryEnumType } from '@/types/job-post'
import { useTranslation } from 'react-i18next'

interface SalaryTypeBadgeProps {
  salaryType: SalaryEnumType
}

export default function SalaryTypeBadge({ salaryType }: SalaryTypeBadgeProps) {
  const { t } = useTranslation('jobPost')

  const SalaryTypeClassName = (salaryEnumType: SalaryEnumType) => {
    switch (salaryEnumType) {
      case 'HOURLY':
        return 'flex items-center justify-center badge-sm text-sub3 border-sub3 border h-[22px] px-2 rounded-[8px]'
      case 'ANNUAL':
        return 'flex items-center justify-center badge-sm text-main-dark border-main-dark border h-[22px] px-2 rounded-[8px]'
      case 'MONTHLY':
        return 'flex items-center justify-center badge-sm text-sub2 border-sub2 border h-[22px] px-2 rounded-[8px]'
      case 'WEEKLY':
        return 'flex items-center justify-center badge-sm text-sub5 border-sub5 border h-[22px] px-2 rounded-[8px]'
      case 'DAILY':
        return 'flex items-center justify-center badge-sm text-sub1 border-sub1 border h-[22px] px-2 rounded-[8px]'
      default:
        return 'flex items-center justify-center badge-sm text-main border-main border h-[22px] px-2 rounded-[8px]'
    }
  }

  return (
    <div className={SalaryTypeClassName(salaryType)}>
      <p className="kr-badge-sm">{t(convertEnumToKorSalaryTypeLabel(salaryType))}</p>
    </div>
  )
}
