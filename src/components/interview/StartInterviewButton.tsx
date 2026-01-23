'use client'

import { Button } from '@/components/common'
import AIInterviewTestSettingModal from '@/components/common/modal/AIInterviewTestSettingModal'
import { ArrowFowardGray3Icon } from '@/assets/svgComponents'
import { useState } from 'react'

export default function StartInterviewButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <div>
      {isModalOpen ? <AIInterviewTestSettingModal onClose={() => setIsModalOpen(false)} isOpen={isModalOpen} /> : null}
      <Button
        onClick={() => {
          setIsModalOpen(true)
        }}
        size={'md'}
        variant={'primary'}
        customClassName={'w-[126px]'}
        rightIcon={<ArrowFowardGray3Icon width={20} height={20} />}
      >
        새 면접 시작
      </Button>
    </div>
  )
}
