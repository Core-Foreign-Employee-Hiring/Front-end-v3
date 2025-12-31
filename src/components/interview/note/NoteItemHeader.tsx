import { Badge } from '@/components/common'

interface NoteItemHeaderProps {
  status: 'PENDING' | 'COMPLETED'
  title: string
}
export default function NoteItemHeader({ status, title }: NoteItemHeaderProps) {
  return (
    <div className="flex w-full items-center justify-between">
      <h2 className="kr-title-md">{title}</h2>
      <Badge
        textColor={status === 'PENDING' ? 'text-main-500' : 'text-sub1'}
        bgColor={status === 'PENDING' ? 'bg-main-100' : 'bg-[#00B0A933]'}
      >
        {status === 'PENDING' ? '최종 답변 작성완료' : '최종 답변 대기'}
      </Badge>
    </div>
  )
}
