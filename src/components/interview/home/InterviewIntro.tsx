'use client'

import { useState } from 'react'
import { AIInterviewTestSettingModal, Button, Label, Spacing } from '@/components/common'

export default function InterviewIntro() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <div>
      {isModalOpen && (
        <AIInterviewTestSettingModal
          onClose={() => {
            setIsModalOpen(false)
          }}
          isOpen={isModalOpen}
        />
      )}
      <Label label={'KORFIT과 함께하는 실전 면접 준비'} type={'subtitleLg'} />
      <Spacing height={8} />

      <p className="kr-body-md">
        직무별 맞춤 질문으로 실전처럼 연습하고, 면접 역량을 향상시킬 수 있는 <br /> AI의 상세한 분석을 받아보세요.
      </p>
      <Spacing height={16} />

      <div className="flex gap-x-2">
        <Button customClassName={'w-[96px]'} variant={'secondary'} size={'md'}>
          이용가이드
        </Button>
      </div>
    </div>
  )
}
