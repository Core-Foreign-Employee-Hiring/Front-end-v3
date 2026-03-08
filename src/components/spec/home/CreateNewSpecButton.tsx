'use client'

import { Button } from '@/components/common'
import { WhitePlusIcon } from '@/assets/svgComponents'
import { usePathname, useRouter } from 'next/navigation'
import { SpecType } from '@/app/[lang]/career/page'
import { useTranslation } from 'react-i18next'

export default function CreateNewSpecButton() {
  const router = useRouter()
  const pathname = usePathname()
  const { t } = useTranslation(['spec'])

  const handleStepClick = (type: SpecType) => {
    router.push(`${pathname}?tab=spec&type=${encodeURIComponent(type)}`)
  }
  return (
    <Button
      onClick={() => handleStepClick('form')}
      size={'md'}
      customClassName={'w-fit'}
      leftIcon={<WhitePlusIcon width={20} height={20} />}
    >
      {t('spec:home.button.create_new_spec')}
    </Button>
  )
}
