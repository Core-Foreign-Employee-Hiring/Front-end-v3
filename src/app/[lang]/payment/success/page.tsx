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

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const { t } = useTranslation('payment')
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(true)

  // 1. URL에서 값 추출
  const orderId = searchParams.get('orderId') || ''
  const amount = searchParams.get('amount') || '0'
  const paymentKey = searchParams.get('paymentKey') || ''

  // 2. 페이지 진입 시 자동 승인 요청
  useEffect(() => {
    const confirmPayment = async () => {
      // 값이 모두 존재할 때만 실행
      if (!paymentKey || !orderId || !amount) return

      const paymentConfirmData: PaymentConfirmType = {
        paymentKey,
        merchantOrderId: orderId, // orderId를 merchantOrderId로 매핑
        amount,
        agreePaymentTerms: true,
        agreePrivacyPolicy: true,
        agreeRefundPolicy: true,
      }

      try {
        const result = await postPaymentContent(paymentConfirmData)

        if (result.success) {
          console.log('결제 승인 성공:', result.data)
          // 성공 시 처리 로직 (예: 알림 띄우기)
        } else {
          console.error('결제 승인 실패:', result.error)
          // 실패 시 에러 페이지 이동 혹은 안내 로직
          // alert('결제 승인 중 오류가 발생했습니다.')
        }
      } catch (error) {
        console.error('API 호출 중 예상치 못한 에러:', error)
      } finally {
        setIsProcessing(false)
      }
    }

    confirmPayment()
  }, [paymentKey, orderId, amount]) // 파라미터가 준비되면 실행

  return (
    <main className="desktop:w-[588px] mx-auto flex w-full flex-col gap-y-8 px-4 py-20">
      <ResultFeedback
        icon={<PaymentSuccessIcon width={60} height={60} />}
        title={isProcessing ? t('payment:success.processingTitle') : t('payment:success.title')}
        content={isProcessing ? t('payment:success.processingContent') : t('payment:success.thanksMessage')}
      />

      <PaymentResultSummary orderId={orderId} amount={amount} />

      <CTAButtons
        rightElement={
          <Button
            onClick={() => router.push('/mypage/payment')}
            variant={'primary'}
            disabled={isProcessing} // 승인 중에는 클릭 방지
          >
            {t('payment:success.button.useNow')}
          </Button>
        }
        leftElement={
          <Button onClick={() => router.push('/mypage/payment')} variant={'secondary'} disabled={isProcessing}>
            {t('payment:success.button.viewHistory')}
          </Button>
        }
      />
    </main>
  )
}
