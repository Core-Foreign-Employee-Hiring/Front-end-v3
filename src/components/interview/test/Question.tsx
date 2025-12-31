import { ShortLogoIcon } from '@/assets/svgComponents'
import { Badge } from '@/components/common'

interface QuestionProps {
  question: string
  sequence: number
  type: 'COMMON' | 'DEEP'
}

export default function Question({ question, type, sequence }: QuestionProps) {
  return (
    <div className="flex gap-x-[22px]">
      <ShortLogoIcon width={40} height={40} />
      <section
        className={'border-gray2 flex flex-col gap-y-2 rounded-l-[4px] rounded-r-[12px] rounded-b-[12px] border p-4'}
      >
        <div className="flex gap-x-2">
          <p className="kr-subtitle-sm text-gray5">질문{sequence}</p>
          <Badge
            bgColor={type === 'DEEP' ? 'bg-main-100' : 'bg-main-300'}
            textColor={type === 'DEEP' ? 'text-main-500' : 'text-white'}
          >
            {type === 'DEEP' ? '압박 면접' : '공통'}
          </Badge>
        </div>
        <p className="kr-subtitle-md">{question}</p>
      </section>
    </div>
  )
}
