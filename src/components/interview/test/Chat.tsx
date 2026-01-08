'use client'

import { Answer, Question } from '@/components/interview'
import { Badge, Spacing } from '@/components/common'
import { useEffect, useRef } from 'react'
import { useInterviewStore } from '@/store/interview/interviewStore'

export default function Chat() {
  const {
    interviewQuestion,
    setCommonAnswer,
    chatList,
    addChatMessage,
    isNextLoading,
    isFollowUpLoading,
    isResultLoading,
  } = useInterviewStore((state) => state)

  const isInitialized = useRef(false)

  useEffect(() => {
    if (isInitialized.current || !interviewQuestion || interviewQuestion.questions.length === 0) {
      return
    }

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

      isInitialized.current = true
    }
  }, [interviewQuestion, chatList.length, addChatMessage, setCommonAnswer])

  // 로딩 상태에 따른 뱃지 텍스트 결정 함수
  const getLoadingText = () => {
    if (isNextLoading) return '질문 생성중...'
    if (isFollowUpLoading) return '압박 질문 생성중...'
    if (isResultLoading) return '결과 생성중...'
    return null
  }

  const loadingText = getLoadingText()

  return (
    <div className="flex w-full flex-col items-center justify-center">
      {chatList.map((chat, index) => {
        const isQuestion = chat.type === 'COMMON_QUESTION' || chat.type === 'FOLLOW_UP_QUESTION'
        return (
          <div className="w-full" key={`${chat.id}-${index}`}>
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

      <Spacing height={20} />

      {/* 로딩 뱃지 중앙 정렬 처리 */}
      {loadingText && (
        <div className="flex w-full animate-pulse justify-center py-2">
          <Badge bgColor={'bg-gray1 border border-gray2'} textColor={'text-gray4'}>
            {loadingText}
          </Badge>
        </div>
      )}
    </div>
  )
}
