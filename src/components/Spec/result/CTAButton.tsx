'use client'

import { useRouter } from 'next/navigation'

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
      className="bg-gray1 flex w-full flex-col gap-y-2 rounded-[12px] p-5"
    >
      <p className="kr-title-md text-main-500">Step {step}</p>
      <div className="flex flex-col">
        <p className="kr-subtitle-lg">작성한 스펙 기반으로</p>
        <p className="kr-subtitle-lg">{stepContent}</p>
      </div>
    </div>
  )
}
