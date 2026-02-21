'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

interface AccountRecoveryLinksProps {
  findIdHref: string
  findPwHref: string
}

export default function FindAccountLinks({ findIdHref, findPwHref }: AccountRecoveryLinksProps): ReactNode {
  const { t } = useTranslation('login')
  return (
    <div className="kr-button text-gray5 flex items-center gap-x-2">
      <Link href={findIdHref}>
        {t('buttons.find_id')} <span className="pl-1">|</span>
      </Link>
      <Link href={findPwHref}>{t('buttons.find_pw')}</Link>
    </div>
  )
}
