'use client'

import { useCallback, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import ResultFeedback from '@/components/payment/result/ResultFeedback'
import PaymentResultSummary from '@/components/payment/result/PaymentResultSummary'
import CTAButtons from '@/components/payment/result/CTAButtons'
import { PaymentErrorIcon } from '@/assets/svgComponents'
import { Button } from '@/components/common'
import { useTranslation } from 'react-i18next'
import { useGTM } from '@/hooks/common/useGTM'

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
  }
}

const GTM_EVENT = {
  PAGE_VIEW: 'view_complete_content_purchase_error',
  RETRY_CLICK: 'click_complete_content_purchase_error',
} as const

export default function PaymentErrorPage() {
  const { t } = useTranslation('payment')
  const searchParams = useSearchParams()
  const router = useRouter()
  const { pushEvent } = useGTM()

  const orderId = searchParams.get('orderId') ?? ''
  const amount = searchParams.get('amount') ?? ''

  useEffect(() => {
    pushEvent(GTM_EVENT.PAGE_VIEW, {
      element_id: 'view_complete_content_purchase_error',
      order_id: orderId,
      amount,
    })
  }, [pushEvent, orderId, amount])

  const handleRetry = useCallback(() => {
    pushEvent(GTM_EVENT.RETRY_CLICK, {
      element_id: 'click_complete_content_purchase_error',
      order_id: orderId,
      amount,
    })
    router.back()
  }, [pushEvent, orderId, amount, router])

  return (
    <main
      id="view_complete_content_purchase_error"
      className="desktop:w-[588px] mx-auto flex w-full flex-col gap-y-8 px-4 py-20"
    >
      <ResultFeedback
        icon={<PaymentErrorIcon width={60} height={60} />}
        title={t('payment:fail.title')}
        content={t('payment:fail.content')}
      />
      <PaymentResultSummary orderId={orderId} amount={amount} />
      <CTAButtons
        rightElement={
          <Button id="click_complete_content_purchase_error" onClick={handleRetry} variant="primary">
            {t('payment:fail.button.retry')}
          </Button>
        }
      />
    </main>
  )
}
