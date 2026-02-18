'use client'
import { SpecExperienceType } from '@/types/spec'
import { Label, Spacing, TextInput } from '@/components/common'

interface EditExpDescriptionProps {
  editExperience: SpecExperienceType
  handleExperienceChange: (fieldName: keyof SpecExperienceType, value: string | number | null) => void
}
export default function EditExpDescription({ editExperience, handleExperienceChange }: EditExpDescriptionProps) {
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
        value={editExperience.description}
        onChange={(e) => handleExperienceChange('description', e.target.value)}
      />
    </div>
  )
}
