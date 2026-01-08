import { Button } from '@/components/common'
import { DropDownGray3Icon, DropDownGray4Icon } from '@/assets/svgComponents'

interface DetailedFeedbackHeaderProps {
  isOpen: boolean
  questionOrder: number
  question: string
}

export default function DetailedFeedbackHeader({ questionOrder, isOpen, question }: DetailedFeedbackHeaderProps) {
  return (
    <section className="flex items-center justify-between">
      <p className="kr-title-sm">
        Q{questionOrder}. {question}
      </p>
      <div className="flex items-center gap-x-2">
        <Button size={'sm'} variant={'outline'}>
          답변노트에 저장
        </Button>
        {isOpen ? <DropDownGray3Icon width={24} height={24} /> : <DropDownGray4Icon width={24} height={24} />}
      </div>
    </section>
  )
}
