'use client'

import { BackIcon } from '@/assets/svgComponents'
import { ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface InterviewHeaderProps {
  leftElement: ReactNode
  rightElement: ReactNode
}

export default function InterviewHeader({ leftElement, rightElement }: InterviewHeaderProps) {
  const router = useRouter()

  return (
    <header className="border-gray2 flex w-full items-center gap-x-5 border-b px-[40px] py-[20px]">
      <BackIcon
        onClick={() => {
          router.back()
        }}
        className="h-8 w-8"
      />
      <div className="flex w-full items-center justify-between">
        {leftElement && leftElement}
        {rightElement && rightElement}
      </div>
    </header>
  )
}
