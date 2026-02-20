'use client'
import { SpecExperienceType } from '@/types/spec'
import { Label, Spacing, TextInput } from '@/components/common'
import { useTranslation } from 'react-i18next'

interface ExpDescriptionProps {
  experience: SpecExperienceType
  index: number
  handleExperienceChange: (index: number, fieldName: keyof SpecExperienceType, value: string | null) => void
}

export default function ExpDescription({ index, handleExperienceChange, experience }: ExpDescriptionProps) {
  const { t } = useTranslation(['spec'])
  return (
    <div>
      <Label
        type={'inputLabel'}
        label={t('experience.form.description.title')}
        isRequired={true}
        className={'kr-title-sm text-gray5'}
      />
      <Spacing height={8} />
      <TextInput
        textType={'textArea'}
        placeholder={t('experience.form.description.placeholder')}
        value={experience.description}
        onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
      />
    </div>
  )
}
