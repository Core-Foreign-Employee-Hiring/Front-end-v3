'use client'

import { useState } from 'react'
import DetailedFeedbackHeader from '@/components/interview/result/DetailedFeedbackHeader'
import DetailedFeedbackBody from '@/components/interview/result/DetailedFeedbackBody'

interface DetailedFeedbackItemProps {
  question: string
  questionOrder: number
  userAnswer: string
  followUpQuestion: string | null
  followUpAnswer: string | null
  feedback: string
  improvements: string
}

export default function DetailedFeedbackItem({
  question,
  questionOrder,
  feedback,
  followUpQuestion,
  followUpAnswer,
  userAnswer,
  improvements,
}: DetailedFeedbackItemProps) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div
      onClick={() => {
        setIsOpen(!isOpen)
      }}
      className="border-gray2 rounded-[16px] border p-4"
    >
      <DetailedFeedbackHeader question={question} questionOrder={questionOrder} isOpen={isOpen} />

      {isOpen && (
        <DetailedFeedbackBody
          userAnswer={userAnswer}
          followUpQuestion={followUpQuestion}
          followUpAnswer={followUpAnswer}
          feedback={feedback}
          improvements={improvements}
        />
      )}
    </div>
  )
}
