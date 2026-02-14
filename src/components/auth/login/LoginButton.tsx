'use client'

import { Button } from '@/components/common'
import { useAuthStore } from '@/store/authStore'

interface LoginButtonProps {
  lang: string
}

export default function LoginButton({ lang }: LoginButtonProps) {
  const { loading } = useAuthStore((state) => state)

  return (
    <div className="w-full">
      <Button
        isLoading={loading}
        buttonType="submit" // 폼 제출을 트리거함
      >
        로그인
      </Button>
    </div>
  )
}
