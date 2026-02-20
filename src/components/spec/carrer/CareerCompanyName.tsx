'use client'

import { Label, Spacing, TextInput } from '@/components/common'
import { useTranslation } from 'react-i18next'

interface CareerCompanyNameProps {
  index: number
  companyName: string
  handleCareerChange: (
    index: number,
    fieldName: 'endDate' | 'startDate' | 'highlight' | 'position' | 'companyName' | 'contractType',
    value: string
  ) => void
}
export default function CareerCompanyName({ index, handleCareerChange, companyName }: CareerCompanyNameProps) {
  const { t } = useTranslation(['spec'])
  return (
    <div>
      <Label
        type={'inputLabel'}
        label={t('career.form.companyName.title')}
        isRequired={true}
        className={'kr-title-sm text-gray5'}
      />
      <Spacing height={8} />
      <TextInput
        placeholder={t('career.form.companyName.placeholder')}
        value={companyName}
        onChange={(e) => handleCareerChange(index, 'companyName', e.target.value)}
      />
    </div>
  )
}
