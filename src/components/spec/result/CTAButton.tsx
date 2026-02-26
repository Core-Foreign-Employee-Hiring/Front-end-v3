'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/common'
import { WhiteRightArrowIcon } from '@/assets/svgComponents'

interface CTAButtonProps {
  step: '2' | '3' | '4'
  stepContent: string
  path: string
}
export default function CTAButton({ step, stepContent, path }: CTAButtonProps) {
  const router = useRouter()

  return (
    <div
      onClick={() => {
        router.push(`${path}`)
      }}
      className="bg-gray1 flex w-full cursor-pointer flex-col gap-y-2 rounded-[12px] p-5"
    >
      <p className="kr-subtitle-lg text-main-500">Step {step}</p>
      <div className="flex items-center justify-between">
        <p className="kr-subtitle-lg">{stepContent}</p>
        <Button customClassName={'w-[52px]'} leftIcon={<WhiteRightArrowIcon width={28} height={28} />} />
      </div>
    </div>
  )
}
