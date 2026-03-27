'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import ResultFeedback from '@/components/payment/result/ResultFeedback'
import PaymentResultSummary from '@/components/payment/result/PaymentResultSummary'
import CTAButtons from '@/components/payment/result/CTAButtons'
import { PaymentSuccessIcon } from '@/assets/svgComponents'
import { Button } from '@/components/common'

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  // URL에서 값 추출
  const orderId = searchParams.get('orderId') || ''
  const amount = searchParams.get('amount') || '0'
  const paymentKey = searchParams.get('paymentKey') || ''

  return (
    <main className="desktop:w-[588px] mx-auto flex w-full flex-col gap-y-8 px-4 py-20">
      <ResultFeedback
        icon={<PaymentSuccessIcon width={60} height={60} />}
        title={'결제 완료'}
        content={`구매해주셔서 감사합니다.\n한국 취업에 큰 도움이 되길 바랍니다.`}
      />
      {/* 추출한 데이터를 Summary 컴포넌트에 전달 */}
      <PaymentResultSummary orderId={orderId} amount={amount} />
      <CTAButtons
        rightElement={
          <Button
            onClick={() => {
              router.push('/mypage/payment')
            }}
            variant={'primary'}
          >
            결제상품 바로 이용
          </Button>
        }
        leftElement={
          <Button
            onClick={() => {
              router.push('/mypage/payment')
            }}
            variant={'secondary'}
          >
            결제 내역
          </Button>
        }
      />
    </main>
  )
}
