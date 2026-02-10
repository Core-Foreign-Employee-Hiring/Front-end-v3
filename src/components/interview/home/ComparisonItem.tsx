import { ReactNode } from 'react'

interface ComparisonItemProps {
  icon: ReactNode
  title: string
  content: string
}
export default function ComparisonItem({ icon, title, content }: ComparisonItemProps) {
  return (
    <div className="flex items-center gap-x-2 p-3">
      <div className="bg-gray1 flex h-[48px] w-[48px] items-center justify-center rounded-[4px]">{icon}</div>
      <div className="flex flex-col gap-y-1">
        <p className="kr-subtitle-md">{title}</p>
        <p className="kr-body-sm text-gray5">{content}</p>
      </div>
    </div>
  )
}
