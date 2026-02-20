'use client'
import { SpecExperienceType } from '@/types/spec'
import { Label, Spacing, TextInput } from '@/components/common'
import { useTranslation } from 'react-i18next'

interface EditExpDescriptionProps {
  editExperience: SpecExperienceType
  handleExperienceChange: (fieldName: keyof SpecExperienceType, value: string | number | null) => void
}
export default function EditExpDescription({ editExperience, handleExperienceChange }: EditExpDescriptionProps) {
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
        value={editExperience.description}
        onChange={(e) => handleExperienceChange('description', e.target.value)}
      />
    </div>
  )
}
