'use client'

import CTAButton from '@/components/spec/result/CTAButton'
import { useTranslation } from 'react-i18next'

export default function CTAButtons() {
  const { t } = useTranslation('spec')
  const ctaButtons: { step: '2' | '3' | '4'; content: string; path: string }[] = [
    { step: '2', content: t('spec:result.step2'), path: '/career?tab=resume&type=home' },
    { step: '3', content: t('spec:result.step3'), path: '/interview?tab=home' },
    { step: '4', content: t('spec:result.step4'), path: '/content' },
  ]

  return (
    <div className="desktop:flex-row desktop:gap-x-6 flex flex-col gap-y-5">
      {ctaButtons.map((ctaButton) => (
        <CTAButton key={ctaButton.step} step={ctaButton.step} path={ctaButton.path} stepContent={ctaButton.content} />
      ))}
    </div>
  )
}
