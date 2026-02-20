'use client'

import { Label, Spacing, TextInput } from '@/components/common'
import { useTranslation } from 'react-i18next'

interface EditCareerCompanyNameProps {
  companyName: string
  handleCareerChange: (
    fieldName: 'companyName' | 'position' | 'endDate' | 'startDate' | 'highlight' | 'contractType',
    value: string | null
  ) => void
}
export default function EditCareerCompanyName({ companyName, handleCareerChange }: EditCareerCompanyNameProps) {
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
        onChange={(e) => handleCareerChange('companyName', e.target.value)}
      />
    </div>
  )
}
