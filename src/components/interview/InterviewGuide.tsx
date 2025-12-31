import { Spacing } from '@/components/common'
import { DiamondIcon } from '@/assets/svgComponents'

interface InterviewGuideProps {
  title: string
  content: string
}
export default function InterviewGuide({ content, title }: InterviewGuideProps) {
  return (
    <div className="rounded-[12px] bg-white p-5">
      <div className="flex gap-x-1">
        <DiamondIcon height={24} width={24} />
        <p className="kr-title-sm">{title}</p>
      </div>
      <Spacing height={12} />
      <p className="text-gray5 kr-subtitle-sm">{content}</p>
    </div>
  )
}
