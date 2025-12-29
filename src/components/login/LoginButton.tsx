'use client'

import { Button } from '@/components/common'
import { useAuthStore } from '@/store/authStore'
import { useLoginAction } from '@/hooks'

interface LoginButtonProps {
  lang: string
}

export default function LoginButton({ lang }: LoginButtonProps) {
  const { loading } = useAuthStore((state) => state)

  const { loginProcess } = useLoginAction(lang)

  return (
    <div className="w-full">
      <Button isLoading={loading} onClick={loginProcess}>
        로그인
      </Button>
    </div>
  )
}
