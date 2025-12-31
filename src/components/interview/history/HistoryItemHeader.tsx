import { Badge } from '@/components/common'

interface HistoryItemHeaderProps {
  progress: 'IN_PROGRESS' | 'COMPLETED'
  title: string
}

export default function HistoryItemHeader({ progress, title }: HistoryItemHeaderProps) {
  return (
    <section className="flex justify-between">
      <h3 className="kr-title-md">{title}</h3>
      <Badge
        textColor={progress === 'COMPLETED' ? 'text-sub1' : 'text-main-500'}
        bgColor={progress === 'COMPLETED' ? 'bg-[#00B0A933]' : 'bg-main-100'}
      >
        {progress === 'COMPLETED' ? '완료' : '진행중'}
      </Badge>
    </section>
  )
}
