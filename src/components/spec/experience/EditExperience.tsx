'use client'
import { SpecExperienceType } from '@/types/spec'
import { Label, Spacing, TextInput } from '@/components/common'
import { useTranslation } from 'react-i18next'

interface EditExperienceProps {
  editExperience: SpecExperienceType
  handleExperienceChange: (fieldName: keyof SpecExperienceType, value: string | number | null) => void
}
export default function EditExperience({ editExperience, handleExperienceChange }: EditExperienceProps) {
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
        value={editExperience.experience}
        onChange={(e) => handleExperienceChange('experience', e.target.value)}
      />
    </div>
  )
}
