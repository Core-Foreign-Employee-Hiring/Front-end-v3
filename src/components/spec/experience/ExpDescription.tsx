'use client'
import { SpecExperienceType } from '@/types/spec'
import { Label, Spacing, TextInput } from '@/components/common'

interface ExpDescriptionProps {
  experience: SpecExperienceType
  index: number
  handleExperienceChange: (index: number, fieldName: keyof SpecExperienceType, value: string | null) => void
}

export default function ExpDescription({ index, handleExperienceChange, experience }: ExpDescriptionProps) {
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
        value={experience.description}
        onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
      />
    </div>
  )
}
