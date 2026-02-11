import { Label, Spacing, TextInput } from '@/components/common'

interface CareerHighlightProps {
  index: number
  highlight: string
  handleCareerChange: (
    index: number,
    fieldName: 'companyName' | 'position' | 'endDate' | 'startDate' | 'highlight' | 'contractType',
    value: string
  ) => void
}
export default function CareerHighlight({ index, highlight, handleCareerChange }: CareerHighlightProps) {
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
        value={highlight}
        onChange={(e) => handleCareerChange(index, 'highlight', e.target.value)}
      />
    </div>
  )
}
