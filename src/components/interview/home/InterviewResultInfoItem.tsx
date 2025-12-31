import { Label, Spacing } from '@/components/common'

interface InterviewResultInfoItemProps {
  title: string
  content: string
  option?: string
}

export default function InterviewResultInfoItem({ title, content, option }: InterviewResultInfoItemProps) {
  return (
    <div className="border-gray2 w-full rounded-[12px] border p-5">
      <Label label={title} type={'button'} labelColor={'text-gray5'} />
      <Spacing height={20} />
      <div className="flex items-end justify-between">
        <p className="kr-title-md">{content}</p>
        <p className="kr-title-sm text-sub1">{option}</p>
      </div>
    </div>
  )
}
