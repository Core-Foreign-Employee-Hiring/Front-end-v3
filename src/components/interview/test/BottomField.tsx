'use client'

import { SwitchButton } from '@/components/common'
import { ChatInputField } from '@/components/interview'
import { useTest } from '@/hooks/interview/useTest'
import { useEffect, useState } from 'react'
import { useInterviewStore } from '@/store/interview/interviewStore'
import { useModalStore } from '@/store/modalStore'
import ServicePrepareModal from '@/components/common/modal/ServicePrepareModal'

export default function BottomField() {
  const [type, setType] = useState<'text' | 'audio'>('text')
  // 분리된 비즈니스 로직 훅
  const { handleCommonSubmit, handleFollowUpSubmit } = useTest()
  const { isServicePrepareModalOpen, setIsServicePrepareModalOpen } = useModalStore((state) => state)

  const {
    chatList,
    setFollowUpAnswer,
    setCommonAnswer,
    followUpAnswer,
    commonAnswer,
    // 1. 분리된 로딩 상태들을 가져옵니다.
    isFollowUpLoading,
    isNextLoading,
    isResultLoading,
  } = useInterviewStore((state) => state)

  // 2. 세 가지 중 하나라도 true이면 통합 isLoading은 true입니다.
  const isAnyLoading = isFollowUpLoading || isNextLoading || isResultLoading

  // 3. 로딩 상태에 따른 맞춤형 메시지 설정
  const getPlaceholder = () => {
    if (isFollowUpLoading) return '압박 질문을 생성하고 있습니다...'
    if (isNextLoading) return '다음 질문을 불러오고 있습니다...'
    if (isResultLoading) return '면접 결과를 분석 중입니다. 잠시만 기다려주세요...'
    return '질문에 대한 답변을 입력하세요.'
  }

  useEffect(() => {
    console.log('💙일반 답변:', commonAnswer)
  }, [commonAnswer])
  useEffect(() => {
    console.log('️🔥압박 답변:', followUpAnswer)
  }, [followUpAnswer])

  const isFollowUpMode = chatList.length > 0 && chatList[chatList.length - 1].type === 'FOLLOW_UP_QUESTION'

  const handleSubmit = () => {
    if (isFollowUpMode) {
      handleFollowUpSubmit()
    } else {
      handleCommonSubmit()
    }
  }

  return (
    <div className="border-gray2 fixed bottom-0 left-0 flex w-full flex-col gap-y-3 border-t bg-white px-[40px] py-[20px]">
      {isServicePrepareModalOpen && <ServicePrepareModal />}
      <SwitchButton
        type={type}
        onClick={(clickedType) => {
          if (clickedType === 'text') {
            setType('text')
          } else if (clickedType === 'audio') {
            // 2. 서비스 준비 중인 경우 로직
            setIsServicePrepareModalOpen(isServicePrepareModalOpen) // 모달을 여는 로직 (기존 isServicePrepareModalOpen 전달은 오타인듯 하네요)
            // 선택은 바꾸지 않거나, 기획에 따라 처리
          }
        }}
        contentList={[
          { content: '텍스트 입력', type: 'text' },
          { content: '음성 입력', type: 'audio' },
        ]}
      />

      <div className="flex flex-col gap-y-2">
        <ChatInputField
          // 4. 통합 로딩 상태 전달
          isLoading={isAnyLoading}
          value={isFollowUpMode ? followUpAnswer.follow_up_answer : commonAnswer.user_answer}
          handleMessageSubmit={handleSubmit}
          onChange={(e) =>
            isFollowUpMode
              ? setFollowUpAnswer({ follow_up_answer: e.target.value })
              : setCommonAnswer({ user_answer: e.target.value })
          }
          // 5. 동적 플레이스홀더 전달
          placeholder={getPlaceholder()}
        />
        <p className="kr-subtitle-sm text-gray5">Shift + Enter로 줄바꿈이 가능합니다.</p>
      </div>
    </div>
  )
}
