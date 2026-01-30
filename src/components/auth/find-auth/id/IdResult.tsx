'use client'

import { formatDate } from '@/utils/common'
import IdBottomButton from '@/components/auth/find-auth/id/IdBottomButton'
import { useFindAuthStore } from '@/store/findAuthStore'

interface IdResultProps {
  step: '1' | '2'
}

export default function IdResult({ step }: IdResultProps) {
  const { findIdVerifyCodeResponseData } = useFindAuthStore((state) => state)
  return (
    <div className="flex flex-col gap-y-[24px]">
      <div className="border-gray2 flex flex-col gap-y-3 rounded-[12px] border bg-white px-3 py-4">
        <p className="kr-button text-gray5">기존 아이디</p>
        <div className="flex items-center justify-between">
          <p className="kr-body-md">{findIdVerifyCodeResponseData.userId}</p>
          <p className="kr-small text-gray4">가입일 {formatDate(findIdVerifyCodeResponseData.createdAt)}</p>
        </div>
      </div>
      <IdBottomButton step={step} />
    </div>
  )
}
