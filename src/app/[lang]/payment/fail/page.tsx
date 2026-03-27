'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import ResultFeedback from '@/components/payment/result/ResultFeedback'
import PaymentResultSummary from '@/components/payment/result/PaymentResultSummary'
import CTAButtons from '@/components/payment/result/CTAButtons'
import { PaymentErrorIcon } from '@/assets/svgComponents'
import { Button } from '@/components/common'

export default function PaymentErrorPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  // URL에서 값 추출
  const orderId = searchParams.get('orderId') || ''
  const amount = searchParams.get('amount') || '0'
  const paymentKey = searchParams.get('paymentKey') || ''

  return (
    <main className="desktop:w-[588px] mx-auto flex w-full flex-col gap-y-8 px-4 py-20">
      <ResultFeedback
        icon={<PaymentErrorIcon width={60} height={60} />}
        title={'결제 실패'}
        content={`결제에 실패했어요. 다시 시도해주세요`}
      />
      {/* 추출한 데이터를 Summary 컴포넌트에 전달 */}
      <PaymentResultSummary orderId={orderId} amount={amount} />
      <CTAButtons
        rightElement={
          <Button
            onClick={() => {
              router.back()
            }}
            variant={'primary'}
          >
            다시시도
          </Button>
        }
      />
    </main>
  )
}
