import { Spacing } from '@/components/common'
import { DiamondIcon } from '@/assets/svgComponents'
import { twMerge } from 'tailwind-merge'

interface InterviewGuideProps {
  title: string
  content1: string
  content2: string
  content3: string
  content4: string
  bgColor?: string
}
export default function InterviewGuide({
  content1,
  content2,
  content3,
  content4,
  title,
  bgColor,
}: InterviewGuideProps) {
  return (
    <div className={`${twMerge('w-full rounded-[12px] bg-white p-5', bgColor)}`}>
      <div className="flex gap-x-1">
        <DiamondIcon height={24} width={24} />
        <p className="kr-title-sm">{title}</p>
      </div>
      <Spacing height={12} />
      <div className="flex flex-col gap-y-2">
        <p className="text-gray5 kr-subtitle-sm">{content1}</p>
        <p className="text-gray5 kr-subtitle-sm">{content2}</p>
        <p className="text-gray5 kr-subtitle-sm">{content3}</p>
        <p className="text-gray5 kr-subtitle-sm">{content4}</p>
      </div>
    </div>
  )
}
