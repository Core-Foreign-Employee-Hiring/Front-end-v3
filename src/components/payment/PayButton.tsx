'use client'

import { Button } from '@/components/common'
import { useOrderStore } from '@/store/orderStore'
import { ANONYMOUS, loadTossPayments } from '@tosspayments/tosspayments-sdk'

interface PayButtonProps {
  amount: string
  orderId: string
  orderName: string
  customerName: string
  customerEmail: string
}

export default function PayButton({ amount, orderId, orderName, customerName, customerEmail }: PayButtonProps) {
  const { agreedToTerms } = useOrderStore()

  const handlePayment = async () => {
    const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY || 'test_ck_코드'

    // 1. SDK 초기화
    const tossPayments = await loadTossPayments(clientKey)

    // 2. 결제 객체 생성 (v2에서 추가된 단계)
    // 비회원 결제라면 ANONYMOUS를, 회원 결제라면 고유한 ID를 입력합니다.
    const payment = tossPayments.payment({ customerKey: ANONYMOUS })

    // 3. 결제창 호출
    await payment.requestPayment({
      method: 'CARD', // 결제 수단 (CARD, TRANSFER, VIRTUAL_ACCOUNT 등)
      amount: {
        currency: 'KRW',
        value: 101,
        // value: parseInt(amount),
      },
      orderId: orderId,
      orderName: orderName,
      successUrl: `${window.location.origin}/payment/success`,
      failUrl: `${window.location.origin}/payment/fail`,
      customerEmail: customerEmail,
      customerName: customerName,
      card: {
        useEscrow: false,
        flowMode: 'DEFAULT',
        useCardPoint: false,
        useAppCardOnly: false,
      },
    })
  }

  return (
    <Button disabled={!agreedToTerms} onClick={handlePayment}>
      결제하기
    </Button>
  )
}
