'use client'

import { SwitchButton } from '@/components/common'
import { useState } from 'react'
import { ChatInputField } from '@/components/interview'

export default function BottomField() {
  const [type, setType] = useState<'text' | 'audio'>('text')

  const handleTypeChange = (newType: 'text' | 'audio') => {
    setType(newType)
  }

  return (
    <div className="border-gray2 fixed bottom-0 left-0 flex w-full flex-col gap-y-3 border-t px-[40px] py-[20px]">
      <SwitchButton
        type={type}
        onClick={handleTypeChange}
        contentList={[
          { content: '텍스트 입력', type: 'text' },
          { content: '음성 입력', type: 'audio' },
        ]}
      />
      <div className="flex flex-col gap-y-2">
        <ChatInputField onSend={() => {}} placeholder={'질문에 대한 답변을 입력하세요.'} />
        <p className="kr-subtitle-sm text-gray5">Shift + Enter로 줄바꿈이 가능합니다.</p>
      </div>
    </div>
  )
}
