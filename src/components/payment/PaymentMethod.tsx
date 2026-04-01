'use client'

import { TossPaymentIcon } from '@/assets/svgComponents'
import ToggleButton from '@/components/common/ToggleButton'
import { useTranslation } from 'react-i18next'

export default function PaymentMethod() {
  const { t } = useTranslation('payment')

  return (
    <div className="flex flex-col gap-y-4">
      <h2 className="kr-subtitle-lg">{t('payment:content.paymentMethod.title')}</h2>
      <section className="flex gap-x-2">
        <ToggleButton type={'SELECT'} onClick={() => {}} />
        <TossPaymentIcon height={20} width={122} />
      </section>
    </div>
  )
}
