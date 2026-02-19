'use client'

import { ReactNode } from 'react'
import { Button } from '@/components/common'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'

interface CTACardProps {
  Icon: ReactNode
  title: string
  description: string
  path: string
}
export default function CTACard({ Icon, title, description, path }: CTACardProps) {
  const { t } = useTranslation(['home'])
  const router = useRouter()

  const onNavigate = () => {
    router.push(path)
  }
  return (
    <div className="desktop:p-5 tablet:p-5 flex w-full flex-col justify-between gap-y-3 rounded-[12px] bg-white p-4">
      <div className="flex flex-col gap-y-3">
        <div className="bg-main-300 flex h-[40px] w-[40px] items-center justify-center rounded-[6px]">{Icon}</div>
        <p className="kr-subtitle-lg">{title}</p>
        <p className="body-sm text-gray5">{description}</p>
      </div>

      <Button onClick={onNavigate} variant={'secondary'} size={'md'}>
        {t('aiCareerVerifyCTA.button')}
      </Button>
    </div>
  )
}
