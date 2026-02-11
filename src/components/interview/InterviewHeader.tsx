'use client'

import { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { useModalStore } from '@/store/modalStore'
import SaveAnswerNoteModal from '@/components/common/modal/SaveAnswerNoteModal'
import CreateNewAnswerNoteModal from '@/components/common/modal/CreateNewAnswerNoteModal'
import { BackIcon } from '@/assets/svgComponents'

interface InterviewHeaderProps {
  leftElement: ReactNode
  rightElement: ReactNode
}

export default function InterviewHeader({ leftElement, rightElement }: InterviewHeaderProps) {
  const router = useRouter()
  const { isSaveAnswerNoteModalOpen, isCreateNewAnswerNoteModalOpen } = useModalStore((state) => state)

  return (
    <header className="border-gray2 tablet:px-[32px] desktop:px-[40px] flex w-full items-center gap-x-5 border-b px-[20px] py-[20px]">
      {isSaveAnswerNoteModalOpen && <SaveAnswerNoteModal />}
      {isCreateNewAnswerNoteModalOpen && <CreateNewAnswerNoteModal />}
      <BackIcon
        onClick={() => {
          router.back()
        }}
        className="desktop:block tablet:hidden hidden h-8 w-8"
      />
      <div className="flex w-full items-center justify-between">
        {leftElement && leftElement}
        {rightElement && rightElement}
      </div>
    </header>
  )
}
