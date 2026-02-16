'use client'

import { Button } from '@/components/common'
import { useModalStore } from '@/store/modalStore'
import { useNoteStore } from '@/store/interview/noteStore'

interface SaveNoteButtonProps {
  question: string
  userAnswer: string
  feedback: string
  improvements: string
  followUpQuestion: string | null
  followUpAnswer: string | null
  customClassName?: string
}

export default function SaveNoteButton({
  question,
  userAnswer,
  feedback,
  improvements,
  followUpQuestion,
  followUpAnswer,
  customClassName,
}: SaveNoteButtonProps) {
  const { toggleModal } = useModalStore((state) => state)
  const { setCreateNoteData, setAnswerEntry } = useNoteStore((state) => state)
  return (
    <Button
      onClick={(e) => {
        e.stopPropagation()
        toggleModal('isSaveAnswerNoteModalOpen')
        //새로운 노트에 데이터 추가
        setCreateNoteData({
          entries: [
            {
              question: question,
              initial_answer: userAnswer,
              feedback: feedback,
              follow_up_question: followUpQuestion,
              follow_up_answer: followUpAnswer,
              improvements: improvements,
              final_answer: null,
            },
          ],
        })

        //기존 노트에 데이터 추가
        setAnswerEntry({
          question: question,
          initial_answer: userAnswer,
          feedback: feedback,
          follow_up_question: followUpQuestion,
          follow_up_answer: followUpAnswer,
          improvements: improvements,
          final_answer: null,
        })
      }}
      size={'sm'}
      customClassName={customClassName}
      variant={'outline'}
    >
      답변노트에 저장
    </Button>
  )
}
