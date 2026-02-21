'use client'

import { Button } from '@/components/common'
import { useAuthStore } from '@/store/authStore'
import { useTranslation } from 'react-i18next'

interface LoginButtonProps {
  lang: string
}

export default function LoginButton({ lang }: LoginButtonProps) {
  const { t } = useTranslation('login')
  const { loading } = useAuthStore((state) => state)

  return (
    <div className="w-full">
      <Button
        isLoading={loading}
        buttonType="submit" // 폼 제출을 트리거함
      >
        {t('title')}
      </Button>
    </div>
  )
}
