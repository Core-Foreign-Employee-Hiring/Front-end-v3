import { SpecExperienceType } from '@/types/spec'
import { Label, Spacing, TextInput } from '@/components/common'

interface ExpDescriptionProps {
  index: number
  activity: SpecExperienceType
  onUpdate: (index: number, newData: SpecExperienceType) => void
  description: string
}

export default function ExpDescription({ index, description, activity, onUpdate }: ExpDescriptionProps) {
  // 공통 변경 핸들러: 기존 activity를 복사하고 특정 필드만 업데이트
  const handleExperienceChange = (index: number, fieldName: keyof SpecExperienceType, value: string | number) => {
    onUpdate(index, {
      ...activity,
      [fieldName]: value,
    })
  }

  return (
    <div>
      <Label type={'inputLabel'} label={'내용'} isRequired={true} className={'kr-title-sm text-gray5'} />
      <Spacing height={8} />
      <TextInput
        textType={'textArea'}
        placeholder={
          '구체적인 역할과 성과 위주의 업무 내용을 작성해보세요.\n' +
          '수치와 함께 표현되면 경험이 잘 전달될 수 있습니다.'
        }
        value={description}
        onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
      />
    </div>
  )
}
