'use client'

import { Label, Spacing, TextInput } from '@/components/common'
import { SpecExperienceType } from '@/types/spec'
import { useTranslation } from 'react-i18next'

interface ExperienceProps {
  experience: SpecExperienceType
  index: number
  handleExperienceChange: (index: number, fieldName: keyof SpecExperienceType, value: string | null) => void
}

export default function Experience({ index, experience, handleExperienceChange }: ExperienceProps) {
  const { t } = useTranslation(['spec'])
  return (
    <div>
      <Label
        type={'inputLabel'}
        label={t('experience.form.experienceName.title')}
        isRequired={true}
        className={'kr-title-sm text-gray5'}
      />
      <Spacing height={8} />
      <TextInput
        placeholder={t('experience.form.experienceName.placeholder')}
        value={experience.experience}
        onChange={(e) => handleExperienceChange(index, 'experience', e.target.value)}
      />
    </div>
  )
}
