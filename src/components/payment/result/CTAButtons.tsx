'use client'

import { useRouter } from 'next/navigation'

interface CTAButtonsProps {
  leftElement?: React.ReactNode
  rightElement?: React.ReactNode
}

export default function CTAButtons({ leftElement, rightElement }: CTAButtonsProps) {
  const router = useRouter()

  return (
    <div className="desktop:static desktop:p-0 fixed bottom-0 left-0 z-50 flex w-full items-center gap-x-4 border-t border-gray-100 bg-white p-5">
      {leftElement}
      {rightElement}
    </div>
  )
}
