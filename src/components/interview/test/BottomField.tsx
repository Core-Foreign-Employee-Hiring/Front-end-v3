'use client'

import { SwitchButton } from '@/components/common'
import { ChatInputField } from '@/components/interview'
import { useTest } from '@/hooks/interview/useTest'
import { useState } from 'react'
import { useInterviewStore } from '@/store/interview/interviewStore'

export default function BottomField() {
  const [type, setType] = useState<'text' | 'audio'>('text')

  // 분리된 비즈니스 로직 훅
  const { handleCommonSubmit, handleFollowUpSubmit } = useTest()

  // 현재 입력 중인 질문이 압박 질문인지 여부 판단
  // (스토어의 chatList 마지막 요소가 FOLLOW_UP_QUESTION인지 등으로 판단 가능)
  const { chatList, setFollowUpAnswer, setCommonAnswer, followUpAnswer, commonAnswer } = useInterviewStore(
    (state) => state
  )
  const isFollowUpMode = chatList.length > 0 && chatList[chatList.length - 1].type === 'FOLLOW_UP_QUESTION'

  const handleSubmit = () => {
    if (isFollowUpMode) {
      handleFollowUpSubmit()
    } else {
      handleCommonSubmit()
    }
  }

  return (
    <div className="border-gray2 fixed bottom-0 left-0 flex w-full flex-col gap-y-3 border-t px-[40px] py-[20px]">
      <SwitchButton
        type={type}
        onClick={setType}
        contentList={[
          { content: '텍스트 입력', type: 'text' },
          { content: '음성 입력', type: 'audio' },
        ]}
      />

      <div className="flex flex-col gap-y-2">
        <ChatInputField
          value={isFollowUpMode ? followUpAnswer.follow_up_answer : commonAnswer.user_answer}
          handleMessageSubmit={handleSubmit}
          onChange={(e) =>
            isFollowUpMode
              ? setFollowUpAnswer({ follow_up_answer: e.target.value })
              : setCommonAnswer({ user_answer: e.target.value })
          }
          placeholder={'질문에 대한 답변을 입력하세요.'}
        />
        <p className="kr-subtitle-sm text-gray5">Shift + Enter로 줄바꿈이 가능합니다.</p>
      </div>
    </div>
  )
}
