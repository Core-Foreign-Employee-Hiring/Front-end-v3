'use client'

import { useRouter } from 'next/navigation'

interface CTAButtonsProps {
  leftElement?: React.ReactNode
  rightElement?: React.ReactNode
}

export default function CTAButtons({ leftElement, rightElement }: CTAButtonsProps) {
  const router = useRouter()

  return (
    <div className="flex items-center gap-x-4">
      {leftElement}
      {rightElement}
    </div>
  )
}
