'use client'

import { SwitchButton } from '@/components/common'
import { ChatInputField } from '@/components/interview'
import { useTest } from '@/hooks/interview/useTest'
import { useEffect, useState } from 'react'
import { useInterviewStore } from '@/store/interview/interviewStore'
import { useModalStore } from '@/store/modalStore'
import ServicePrepareModal from '@/components/common/modal/ServicePrepareModal'
import { useTranslation } from 'react-i18next'

export default function BottomField() {
  const { t } = useTranslation('interview')
  const [type, setType] = useState<'text' | 'audio'>('text')
  // 분리된 비즈니스 로직 훅
  const { handleCommonSubmit, handleFollowUpSubmit } = useTest()
  const { toggleModal, modals } = useModalStore((state) => state)

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
    if (isFollowUpLoading) return t('test.bottom_field.placeholders.follow_up_loading')
    if (isNextLoading) return t('test.bottom_field.placeholders.next_loading')
    if (isResultLoading) return t('test.bottom_field.placeholders.result_loading')
    return t('test.bottom_field.placeholders.default')
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
    <div className="border-gray2 tablet:px-[32px] desktop:px-[40px] fixed bottom-0 left-0 flex w-full flex-col gap-y-3 border-t bg-white px-[20px] py-[20px]">
      {modals.isServicePrepareModalOpen && <ServicePrepareModal />}
      <SwitchButton
        type={type}
        onClick={(clickedType) => {
          if (clickedType === 'text') {
            setType('text')
          } else if (clickedType === 'audio') {
            // 2. 서비스 준비 중인 경우 로직
            toggleModal('isServicePrepareModalOpen')
            // 선택은 바꾸지 않거나, 기획에 따라 처리
          }
        }}
        contentList={[
          { content: t('test.bottom_field.input_types.text'), type: 'text' },
          { content: t('test.bottom_field.input_types.audio'), type: 'audio' },
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
        <p className="kr-subtitle-sm text-gray5">{t('test.bottom_field.guide')}</p>
      </div>
    </div>
  )
}
