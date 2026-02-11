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
        customClassName={'w-[120px]'}
        size={'sm'}
        variant={'primary'}
      >
        다시 도전하기
      </Button>
    </div>
  )
}
