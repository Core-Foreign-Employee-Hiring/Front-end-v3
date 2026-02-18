'use client'

import { Label, Spacing, TextInput } from '@/components/common'
import { SpecExperienceType } from '@/types/spec'

interface ExperienceProps {
  experience: SpecExperienceType
  index: number
  handleExperienceChange: (index: number, fieldName: keyof SpecExperienceType, value: string | null) => void
}

export default function Experience({ index, experience, handleExperienceChange }: ExperienceProps) {
  return (
    <div>
      <Label type={'inputLabel'} label={'활동명'} isRequired={true} className={'kr-title-sm text-gray5'} />
      <Spacing height={8} />
      <TextInput
        placeholder={'활동명을 입력해주세요.'}
        value={experience.experience}
        onChange={(e) => handleExperienceChange(index, 'experience', e.target.value)}
      />
    </div>
  )
}
