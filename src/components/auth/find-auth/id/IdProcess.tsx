'use client'

import NameField from '@/components/auth/find-auth/id/NameField'
import PhoneNumberField from '@/components/auth/find-auth/id/PhoneNumberField'
import IdBottomButton from '@/components/auth/find-auth/id/IdBottomButton'

interface IdProcessProps {
  step: '1' | '2'
}

export default function IdProcess({ step }: IdProcessProps) {
  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-col gap-y-5">
        <NameField />
        <PhoneNumberField />
      </div>

      <IdBottomButton step={step} />
    </div>
  )
}
