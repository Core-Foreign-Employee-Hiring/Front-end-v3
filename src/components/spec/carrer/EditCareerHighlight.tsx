'use client'

import { Label, Spacing, TextInput } from '@/components/common'
import { useTranslation } from 'react-i18next'

interface EditCareerHighlightProps {
  highlight: string
  handleCareerChange: (
    fieldName: 'companyName' | 'position' | 'endDate' | 'startDate' | 'highlight' | 'contractType',
    value: string | null
  ) => void
}

export default function EditCareerHighlight({ highlight, handleCareerChange }: EditCareerHighlightProps) {
  const { t } = useTranslation(['spec'])
  return (
    <div>
      <Label type={'inputLabel'} label={t('career.form.highlight.title')} className={'kr-title-sm text-gray5'} />
      <Spacing height={8} />
      <TextInput
        textType={'textArea'}
        placeholder={t('career.form.highlight.placeholder')}
        value={highlight}
        onChange={(e) => handleCareerChange('highlight', e.target.value)}
      />
    </div>
  )
}
