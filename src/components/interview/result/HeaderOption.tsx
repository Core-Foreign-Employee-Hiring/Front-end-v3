'use client'

import { useState } from 'react'
import { AIInterviewTestSettingModal, Button } from '@/components/common'

export default function HeaderOption() {
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
      <Button
        onClick={() => {
          setIsModalOpen(true)
        }}
        customClassName={'w-[140px]'}
        size={'sm'}
        variant={'primary'}
        leftIcon={<div className="h-[20px] w-[20px]" />}
      >
        다시 도전하기
      </Button>
    </div>
  )
}
