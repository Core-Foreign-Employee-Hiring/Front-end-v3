'use client'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'

export default function SignUpCTAButton({ href }: { href: string }) {
  const { t } = useTranslation('login')
  return (
    <Link href={href} className="kr-button text-main-500 decoration-main-500 underline decoration-1 underline-offset-4">
      {t('buttons.sign_up')}
    </Link>
  )
}
