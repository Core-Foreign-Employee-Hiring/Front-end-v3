'use client'

import { DropDownGray3Icon, DropDownGray4Icon } from '@/assets/svgComponents'
import { ReactNode } from 'react'

interface DetailedFeedbackHeaderProps {
  isOpen: boolean
  questionOrder: number
  question: string
  questionId: string
  userAnswer: string
  feedback: string
  improvements: string
  rightButton?: ReactNode
}

export default function DetailedFeedbackHeader({
  questionOrder,
  isOpen,
  question,
  rightButton,
}: DetailedFeedbackHeaderProps) {
  return (
    <>
      <section className="flex items-center justify-between">
        <p className="kr-title-sm">
          Q{questionOrder}. {question}
        </p>
        <div className="flex items-center gap-x-2">
          {rightButton ? rightButton : null}
          {isOpen ? <DropDownGray3Icon width={24} height={24} /> : <DropDownGray4Icon width={24} height={24} />}
        </div>
      </section>
    </>
  )
}
