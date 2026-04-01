'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import ResultFeedback from '@/components/payment/result/ResultFeedback'
import PaymentResultSummary from '@/components/payment/result/PaymentResultSummary'
import CTAButtons from '@/components/payment/result/CTAButtons'
import { PaymentErrorIcon } from '@/assets/svgComponents'
import { Button } from '@/components/common'
import { useTranslation } from 'react-i18next'

export default function PaymentErrorPage() {
  const { t } = useTranslation('payment')
  const searchParams = useSearchParams()
  const router = useRouter()

  // URL에서 값 추출
  const orderId = searchParams.get('orderId') || ''
  const amount = searchParams.get('amount') || '0'

  return (
    <main className="desktop:w-[588px] mx-auto flex w-full flex-col gap-y-8 px-4 py-20">
      <ResultFeedback
        icon={<PaymentErrorIcon width={60} height={60} />}
        title={t('payment:fail.title')}
        content={t('payment:fail.content')}
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
            {t('payment:fail.button.retry')}
          </Button>
        }
      />
    </main>
  )
}
