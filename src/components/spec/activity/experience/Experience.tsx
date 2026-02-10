import { SpecExperienceType } from '@/types/spec'
import { Label, Spacing, TextInput } from '@/components/common'

interface ExperienceProps {
  index: number
  activity: SpecExperienceType
  onUpdate: (index: number, newData: SpecExperienceType) => void
  experience: string
}

export default function Experience({ index, activity, onUpdate, experience }: ExperienceProps) {
  // 공통 변경 핸들러: 기존 activity를 복사하고 특정 필드만 업데이트
  const handleExperienceChange = (index: number, fieldName: keyof SpecExperienceType, value: string | number) => {
    onUpdate(index, {
      ...activity,
      [fieldName]: value,
    })
  }

  return (
    <div>
      <Label type={'inputLabel'} label={'활동명'} isRequired={true} className={'kr-title-sm text-gray5'} />
      <Spacing height={8} />
      <TextInput
        placeholder={'활동명을 입력해주세요.'}
        value={experience}
        onChange={(e) => handleExperienceChange(index, 'experience', e.target.value)}
      />
    </div>
  )
}
