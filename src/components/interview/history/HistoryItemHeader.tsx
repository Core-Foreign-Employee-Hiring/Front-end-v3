import { Badge } from '@/components/common'
import { InterviewStatusType } from '@/types/interview'

interface HistoryItemHeaderProps {
  progress: InterviewStatusType
  title: string
}

export default function HistoryItemHeader({ progress, title }: HistoryItemHeaderProps) {
  return (
    <section className="flex justify-between">
      <h3 className="kr-title-md">{title}</h3>
      <Badge
        textColor={progress === 'completed' ? 'text-sub1' : 'text-main-500'}
        bgColor={progress === 'completed' ? 'bg-[#00B0A933]' : 'bg-main-100'}
      >
        {progress === 'completed' ? '완료' : '진행중'}
      </Badge>
    </section>
  )
}
