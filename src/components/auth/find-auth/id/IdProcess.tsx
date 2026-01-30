'use client'

import NameField from '@/components/auth/find-auth/id/NameField'
import PhoneNumberField from '@/components/auth/find-auth/id/PhoneNumberField'
import IdBottomButton from '@/components/auth/find-auth/id/IdBottomButton'
import { useState } from 'react'

interface IdProcessProps {
  step: '1' | '2'
}

export default function IdProcess({ step }: IdProcessProps) {
  const [verifyCode, setVerifyCode] = useState<string>('')

  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-col gap-y-5">
        <NameField />
        <PhoneNumberField setVerifyCode={setVerifyCode} verifyCode={verifyCode} />
      </div>

      <IdBottomButton verifyCode={verifyCode} step={step} />
    </div>
  )
}
