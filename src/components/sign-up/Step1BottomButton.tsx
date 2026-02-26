'use client'

import { Button } from '@/components/common'
import { useRegisterStore } from '@/store/registerStore'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'

interface Step1BottomButtonProps {
  lang: string
}

export default function Step1BottomButton({ lang }: Step1BottomButtonProps) {
  const { t } = useTranslation('signup')
  const router = useRouter()

  const isStep1FormValid = useRegisterStore((state) => state.isStep1FormValid())
  return (
    <Button
      disabled={!isStep1FormValid}
      onClick={() => {
        router.push(`/${lang}/sign-up?step=2`)
      }}
      state={isStep1FormValid ? 'default' : 'disable'}
    >
      {t('step1.buttons.next')}
    </Button>
  )
}
