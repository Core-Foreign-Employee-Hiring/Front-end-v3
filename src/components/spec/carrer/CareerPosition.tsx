'use client'

import { Label, Spacing, TextInput } from '@/components/common'
import { useTranslation } from 'react-i18next'

interface CareerPositionProps {
  index: number
  position: string
  handleCareerChange: (
    index: number,
    fieldName: 'position' | 'companyName' | 'endDate' | 'startDate' | 'highlight' | 'contractType',
    value: string
  ) => void
}
export default function CareerPosition({ index, position, handleCareerChange }: CareerPositionProps) {
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
        onChange={(e) => handleCareerChange(index, 'position', e.target.value)}
      />
    </div>
  )
}
