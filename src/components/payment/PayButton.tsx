'use client'

import { useState } from 'react' // 로딩 상태 관리를 위해 추가
import { Button } from '@/components/common'
import { useOrderStore } from '@/store/orderStore'
import { ANONYMOUS, loadTossPayments } from '@tosspayments/tosspayments-sdk'
import { postOrder } from '@/lib/client/order'
import { useToast } from '@/components/common/toast/ToastContext'
import { useTranslation } from 'react-i18next'

interface PayButtonProps {
  amount: string
  customerName: string
  customerEmail: string
  archiveId: string
}

export default function PayButton({ amount, customerName, customerEmail, archiveId }: PayButtonProps) {
  const { t } = useTranslation('payment')

  const [isLoading, setIsLoading] = useState(false) // 중복 결제 방지용
  const { agreedToTerms } = useOrderStore()
  const { error } = useToast()

  const handlePayment = async () => {
    if (isLoading) return

    setIsLoading(true)
    try {
      const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY || 'test_ck_코드'

      // 1. SDK 초기화
      const tossPayments = await loadTossPayments(clientKey)

      // 2. 결제 객체 생성
      const payment = tossPayments.payment({ customerKey: ANONYMOUS })

      // 주문 생성 API 호출
      const result = await postOrder([Number(archiveId)])

      if (result.success && result.data?.data) {
        // 3. 결제창 호출 (모바일 최적화 설정)
        await payment.requestPayment({
          method: 'CARD',
          amount: {
            currency: 'KRW',
            value: Number(amount),
          },
          orderId: result.data.data.merchantOrderId,
          orderName: result.data.data.orderName,
          successUrl: `${window.location.origin}/payment/success`,
          failUrl: `${window.location.origin}/payment/fail`,
          customerEmail: customerEmail,
          customerName: customerName,
          // 중요: 모바일에서는 팝업보다 현재 창 전환이 훨씬 안정적입니다.
          windowTarget: 'self',
          card: {
            useEscrow: false,
            flowMode: 'DEFAULT',
            useCardPoint: false,
            useAppCardOnly: false,
          },
        })
      } else {
        error('결제중 오류 발생', '주문 정보 생성에 실패했습니다.')
      }
    } catch (err) {
      console.error(err)
      error('결제중 오류 발생', '결제 프로세스 중 문제가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="desktop:static desktop:p-0 fixed bottom-0 left-0 z-50 w-full border-t border-gray-100 bg-white p-5">
      <Button disabled={!agreedToTerms || isLoading} onClick={handlePayment}>
        {isLoading ? t('payment:content.payButton.preparing') : t('payment:content.payButton.pay')}
      </Button>
      {/* 아이폰 하단 Safe Area 대응 (모바일 브라우저 주소창/홈바 간섭 방지)
          Tailwind: pb-[safe-area-inset-bottom] 등을 레이아웃 상단에서 적용 권장
      */}
    </div>
  )
}
