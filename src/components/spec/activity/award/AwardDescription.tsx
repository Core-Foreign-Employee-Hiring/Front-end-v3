import { SpecAwardType } from '@/types/spec'
import { Label, Spacing, TextInput } from '@/components/common'

interface AwardDescriptionProps {
  index: number
  activity: SpecAwardType
  onUpdate: (index: number, newData: SpecAwardType) => void
  description: string
}
export default function AwardDescription({ index, activity, onUpdate, description }: AwardDescriptionProps) {
  // 공통 변경 핸들러: 기존 activity를 복사하고 특정 필드만 업데이트
  const handleAwardChange = (index: number, fieldName: keyof SpecAwardType, value: string | number) => {
    onUpdate(index, {
      ...activity,
      [fieldName]: value,
    })
  }

  return (
    <div>
      <Label type={'inputLabel'} label={'내용'} className={'kr-title-sm text-gray5'} />
      <Spacing height={8} />
      <TextInput
        textType={'textArea'}
        placeholder={
          '구체적인 역할과 성과 위주의 업무 내용을 작성해보세요.\n' +
          '수치와 함께 표현되면 경험이 잘 전달될 수 있습니다.'
        }
        value={description}
        onChange={(e) => handleAwardChange(index, 'description', e.target.value)}
      />
    </div>
  )
}
