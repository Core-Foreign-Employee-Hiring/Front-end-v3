'use client'

import { SpecAwardType } from '@/types/spec'
import { Label, Spacing, TextInput } from '@/components/common'
import { useTranslation } from 'react-i18next'

interface AwardDescriptionProps {
  index: number
  award: SpecAwardType
  handleAwardChange: (
    index: number,
    fieldName: 'awardName' | 'host' | 'acquiredDate' | 'description' | 'documentUrl',
    value: string | File | null
  ) => void
}
export default function AwardDescription({ index, award, handleAwardChange }: AwardDescriptionProps) {
  const { t } = useTranslation(['spec'])
  return (
    <div>
      <Label type={'inputLabel'} label={t('award.form.description.title')} className={'kr-title-sm text-gray5'} />
      <Spacing height={8} />
      <TextInput
        textType={'textArea'}
        placeholder={t('award.form.description.placeholder')}
        value={award.description}
        onChange={(e) => handleAwardChange(index, 'description', e.target.value)}
      />
    </div>
  )
}
