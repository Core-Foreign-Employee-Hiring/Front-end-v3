'use client'

import { Button } from '@/components/common'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

export default function ViewMoreButton() {
  const { t } = useTranslation('my')
  return (
    <Link href="/mypage/content?type=sold&page=0" scroll={false}>
      <Button customClassName={'w-[70px]'} variant={'ghost'} size={'sm'}>
        {t('content.more_button')}
      </Button>
    </Link>
  )
}
