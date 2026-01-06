'use client'

import { Answer, Question } from '@/components/interview'
import { Spacing } from '@/components/common'
import { useEffect, useRef } from 'react'
import { useInterviewStore } from '@/store/interview/interviewStore'

interface ChatProps {}

export default function Chat({}: ChatProps) {
  const { interviewQuestion, setCommonAnswer, chatList, addChatMessage, currentIndex } = useInterviewStore(
    (state) => state
  )

  // 1. 초기화 여부를 추적할 Ref 생성
  const isInitialized = useRef(false)

  useEffect(() => {
    // 2. 이미 초기화되었거나 데이터가 없으면 중단
    if (isInitialized.current || !interviewQuestion || interviewQuestion.questions.length === 0) {
      return
    }

    // 3. chatList가 비어있을 때만 첫 질문 추가
    if (chatList.length === 0) {
      const firstQ = interviewQuestion.questions[0]

      addChatMessage({
        id: firstQ.id,
        type: 'COMMON_QUESTION',
        content: firstQ.question,
        order: firstQ.order,
      })

      setCommonAnswer({
        set_id: interviewQuestion.set_id,
        question_id: firstQ.id,
        question_order: firstQ.order,
        user_answer: '',
      })

      // 4. 초기화 완료 표시
      isInitialized.current = true
    }
  }, [interviewQuestion, chatList.length, addChatMessage, setCommonAnswer])

  return (
    <div className="flex flex-col">
      {chatList.map((chat, index) => {
        const isQuestion = chat.type === 'COMMON_QUESTION' || chat.type === 'FOLLOW_UP_QUESTION'
        return (
          <div key={`${chat.id}-${index}`}>
            <Spacing height={20} />
            {isQuestion ? (
              <Question
                question={chat.content}
                type={chat.type as 'COMMON_QUESTION' | 'FOLLOW_UP_QUESTION'}
                sequence={chat.order ?? 0}
              />
            ) : (
              <Answer answer={chat.content} />
            )}
          </div>
        )
      })}
    </div>
  )
}
