'use client'
import { SpecExperienceType } from '@/types/spec'
import { Label, Spacing, TextInput } from '@/components/common'

interface EditExperienceProps {
  editExperience: SpecExperienceType
  handleExperienceChange: (fieldName: keyof SpecExperienceType, value: string | number | null) => void
}
export default function EditExperience({ editExperience, handleExperienceChange }: EditExperienceProps) {
  return (
    <div>
      <Label type={'inputLabel'} label={'활동명'} isRequired={true} className={'kr-title-sm text-gray5'} />
      <Spacing height={8} />
      <TextInput
        placeholder={'활동명을 입력해주세요.'}
        value={editExperience.experience}
        onChange={(e) => handleExperienceChange('experience', e.target.value)}
      />
    </div>
  )
}
