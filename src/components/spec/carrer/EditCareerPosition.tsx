'use client'

import { Label, Spacing, TextInput } from '@/components/common'
import { useTranslation } from 'react-i18next'

interface EditCareerPositionProps {
  position: string
  handleCareerChange: (
    fieldName: 'companyName' | 'endDate' | 'startDate' | 'highlight' | 'position' | 'contractType',
    value: string | null
  ) => void
}
export default function EditCareerPosition({ position, handleCareerChange }: EditCareerPositionProps) {
  const { t } = useTranslation(['spec'])
  return (
    <div>
      <Label
        type={'inputLabel'}
        label={t('career.form.position.title')}
        isRequired={true}
        className={'kr-title-sm text-gray5'}
      />
      <Spacing height={8} />
      <TextInput
        placeholder={t('career.form.position.placeholder')}
        value={position}
        onChange={(e) => handleCareerChange('position', e.target.value)}
      />
    </div>
  )
}
