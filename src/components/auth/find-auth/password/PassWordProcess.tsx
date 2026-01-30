'use client'

import IdField from '@/components/auth/find-auth/password/IdField'
import NameField from '@/components/auth/find-auth/password/NameField'
import EmailField from '@/components/auth/find-auth/password/EmailField'
import PwBottomButton from '@/components/auth/find-auth/password/PwBottomButton'

interface PassWordProcessProps {
  step: '1' | '2'
}

export default function PassWordProcess({ step }: PassWordProcessProps) {
  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-col gap-y-5">
        <IdField />
        <NameField />
        <EmailField />
      </div>
      <PwBottomButton step={step} />
    </div>
  )
}
