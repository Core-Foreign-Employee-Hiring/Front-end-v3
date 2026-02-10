'use client'

import { Button } from '@/components/common'
import { useRegisterStore } from '@/store/registerStore'
import { useRouter } from 'next/navigation'

interface Step1BottomButtonProps {
  lang: string
}

export default function Step1BottomButton({ lang }: Step1BottomButtonProps) {
  const router = useRouter()

  const isStep1FormValid = useRegisterStore((state) => state.isStep1FormValid())
  return (
    <Button
      onClick={() => {
        router.push(`/${lang}/sign-up?step=2`)
      }}
      state={isStep1FormValid ? 'default' : 'disable'}
    >
      다음
    </Button>
  )
}
