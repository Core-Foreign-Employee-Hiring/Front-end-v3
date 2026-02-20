'use client'

import { Label, Spacing, TextInput } from '@/components/common'
import { SpecAwardType } from '@/types/spec'
import { useTranslation } from 'react-i18next'

interface EditAwardDescriptionProps {
  editAward: SpecAwardType
  handleAwardChange: (
    fieldName: 'awardName' | 'host' | 'acquiredDate' | 'description' | 'documentUrl',
    value: string | File | null
  ) => void
}

export default function EditAwardDescription({ editAward, handleAwardChange }: EditAwardDescriptionProps) {
  const { t } = useTranslation(['spec'])
  return (
    <div>
      <Label type={'inputLabel'} label={t('award.form.description.title')} className={'kr-title-sm text-gray5'} />
      <Spacing height={8} />
      <TextInput
        textType={'textArea'}
        placeholder={t('award.form.description.placeholder')}
        value={editAward.description}
        onChange={(e) => handleAwardChange('description', e.target.value)}
      />
    </div>
  )
}
