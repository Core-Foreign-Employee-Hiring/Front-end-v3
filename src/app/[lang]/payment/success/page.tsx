'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import ResultFeedback from '@/components/payment/result/ResultFeedback'
import PaymentResultSummary from '@/components/payment/result/PaymentResultSummary'
import CTAButtons from '@/components/payment/result/CTAButtons'
import { PaymentSuccessIcon } from '@/assets/svgComponents'
import { Button } from '@/components/common'
import { PaymentConfirmType } from '@/types/order'
import { postPaymentContent } from '@/lib/client/payment'
import { useTranslation } from 'react-i18next'
import { useGTM } from '@/hooks/common/useGTM'
import { useBackPathStore } from '@/store/backPathStore'

// 결제 처리 상태를 명확하게 표현
type PaymentStatus = 'processing' | 'success' | 'error'

const GTM_EVENT = {
  PAGE_VIEW: 'view_complete_content_purchase_success',
  CONFIRM_ERROR: 'view_complete_content_purchase_error',
} as const

export default function PaymentSuccessPage() {
  const { t } = useTranslation('payment')
  const backPath = useBackPathStore((state) => state.backPath)

  const searchParams = useSearchParams()
  const router = useRouter()
  const { pushEvent } = useGTM()

  const [status, setStatus] = useState<PaymentStatus>('processing')

  const orderId = searchParams.get('orderId') ?? ''
  const amount = searchParams.get('amount') ?? ''
  const paymentKey = searchParams.get('paymentKey') ?? ''

  useEffect(() => {
    if (!paymentKey || !orderId || !amount) return

    const confirmPayment = async () => {
      const paymentConfirmData: PaymentConfirmType = {
        paymentKey,
        merchantOrderId: orderId,
        amount,
        agreePaymentTerms: true,
        agreePrivacyPolicy: true,
        agreeRefundPolicy: true,
      }

      try {
        const result = await postPaymentContent(paymentConfirmData)

        if (result.success) {
          setStatus('success')
          pushEvent(GTM_EVENT.PAGE_VIEW, {
            element_id: 'view_complete_content_purchase_success',
            order_id: orderId,
            amount,
          })
        } else {
          setStatus('error')
          pushEvent(GTM_EVENT.CONFIRM_ERROR, {
            element_id: 'view_complete_content_purchase_success',
            order_id: orderId,
            amount,
          })
        }
      } catch (error) {
        setStatus('error')
        pushEvent(GTM_EVENT.CONFIRM_ERROR, {
          order_id: orderId,
          amount,
          error: error instanceof Error ? error.message : 'unknown',
        })
      }
    }

    confirmPayment()
  }, [paymentKey, orderId, amount, pushEvent])

  useEffect(() => {
    if (status === 'error') {
      router.replace(`/payment/error?orderId=${orderId}&amount=${amount}`)
    }
  }, [status, router, orderId, amount])

  const isProcessing = status === 'processing'

  return (
    <main
      id="view_complete_content_purchase_success"
      className="desktop:w-[588px] mx-auto flex w-full flex-col gap-y-8 px-4 py-20"
    >
      <ResultFeedback
        icon={<PaymentSuccessIcon width={60} height={60} />}
        title={t(isProcessing ? 'payment:success.processingTitle' : 'payment:success.title')}
        content={t(isProcessing ? 'payment:success.processingContent' : 'payment:success.thanksMessage')}
      />

      <PaymentResultSummary orderId={orderId} amount={amount} />

      <CTAButtons
        rightElement={
          <Button
            onClick={() => {
              router.push('/mypage/payment')
            }}
            variant="primary"
            disabled={isProcessing}
          >
            {t('payment:success.button.useNow')}
          </Button>
        }
        leftElement={
          <Button
            onClick={() => {
              router.push('/mypage/payment')
            }}
            variant="secondary"
            disabled={isProcessing}
          >
            {t('payment:success.button.viewHistory')}
          </Button>
        }
      />
    </main>
  )
}
