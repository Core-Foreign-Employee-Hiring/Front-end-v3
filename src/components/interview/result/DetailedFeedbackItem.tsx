'use client'

import { ReactNode, useState } from 'react'
import DetailedFeedbackHeader from '@/components/interview/result/DetailedFeedbackHeader'
import DetailedFeedbackBody from '@/components/interview/result/DetailedFeedbackBody'

interface DetailedFeedbackItemProps {
  question: string
  questionId: string
  questionOrder: number
  userAnswer: string
  followUpQuestion: string | null
  followUpAnswer: string | null
  feedback: string
  improvements: string
  noteId?: string
  entryId?: string
  finalAnswer?: string
  isFinalElement?: boolean
  headerRightElement?: ReactNode
}

export default function DetailedFeedbackItem({
  question,
  questionId,
  questionOrder,
  feedback,
  followUpQuestion,
  followUpAnswer,
  userAnswer,
  improvements,
  noteId,
  entryId,
  finalAnswer,
  isFinalElement = false,
  headerRightElement,
}: DetailedFeedbackItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      onClick={() => {
        setIsOpen(!isOpen)
      }}
      className="border-gray2 rounded-[16px] border p-4"
    >
      <DetailedFeedbackHeader
        questionId={questionId}
        userAnswer={userAnswer}
        feedback={feedback}
        improvements={improvements}
        question={question}
        questionOrder={questionOrder}
        isOpen={isOpen}
        rightButton={headerRightElement}
      />

      {isOpen && (
        <DetailedFeedbackBody
          userAnswer={userAnswer}
          followUpQuestion={followUpQuestion}
          followUpAnswer={followUpAnswer}
          feedback={feedback}
          improvements={improvements}
          noteId={noteId}
          entryId={entryId}
          finalAnswer={finalAnswer}
          isFinalElement={isFinalElement}
        />
      )}
    </div>
  )
}
