'use client'

import { SpecAwardType } from '@/types/spec'
import { Label, Spacing, TextInput } from '@/components/common'
import { useTranslation } from 'react-i18next'

interface AwardHostProps {
  index: number
  award: SpecAwardType
  handleAwardChange: (
    index: number,
    fieldName: 'awardName' | 'host' | 'acquiredDate' | 'description' | 'documentUrl',
    value: string | File | null
  ) => void
}
export default function AwardHost({ index, award, handleAwardChange }: AwardHostProps) {
  const { t } = useTranslation(['spec'])
  return (
    <div>
      <Label
        type={'inputLabel'}
        label={t('award.form.host.title')}
        isRequired={true}
        className={'kr-title-sm text-gray5'}
      />
      <Spacing height={8} />
      <TextInput
        placeholder={t('award.form.host.placeholder')}
        value={award.host}
        onChange={(e) => handleAwardChange(index, 'host', e.target.value)}
      />
    </div>
  )
}
