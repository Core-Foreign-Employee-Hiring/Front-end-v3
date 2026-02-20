'use client'

import { SpecAwardType } from '@/types/spec'
import { Label, Spacing, TextInput } from '@/components/common'
import { useTranslation } from 'react-i18next'

interface AwardNameProps {
  index: number
  award: SpecAwardType
  handleAwardChange: (
    index: number,
    fieldName: 'awardName' | 'host' | 'acquiredDate' | 'description' | 'documentUrl',
    value: string | File | null
  ) => void
}

export default function AwardName({ index, award, handleAwardChange }: AwardNameProps) {
  const { t } = useTranslation(['spec'])

  return (
    <div>
      <Label
        type={'inputLabel'}
        label={t('award.form.awardName.title')}
        isRequired={true}
        className={'kr-title-sm text-gray5'}
      />
      <Spacing height={8} />
      <TextInput
        placeholder={t('award.form.awardName.placeholder')}
        value={award.awardName}
        onChange={(e) => handleAwardChange(index, 'awardName', e.target.value)}
      />
    </div>
  )
}
