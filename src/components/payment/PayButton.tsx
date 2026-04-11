'use client'

import { useCallback, useState } from 'react'
import { Button } from '@/components/common'
import { useOrderStore } from '@/store/orderStore'
import { ANONYMOUS, loadTossPayments } from '@tosspayments/tosspayments-sdk'
import { postOrder } from '@/lib/client/order'
import { useToast } from '@/components/common/toast/ToastContext'
import { useTranslation } from 'react-i18next'
import { useGTM } from '@/hooks/common/useGTM'

interface PayButtonProps {
  amount: string
  customerName: string
  customerEmail: string
  archiveId: string
}

const GTM_EVENT = {
  PAY_CLICK: 'click_try_content_purchase_button',
} as const

export default function PayButton({ amount, customerName, customerEmail, archiveId }: PayButtonProps) {
  const { t } = useTranslation('payment')
  const { pushEvent } = useGTM()

  const [isLoading, setIsLoading] = useState(false)
  const { agreedToTerms } = useOrderStore()
  const { error } = useToast()

  const handlePayment = useCallback(async () => {
    if (isLoading) return

    pushEvent(GTM_EVENT.PAY_CLICK, {
      element_id: 'click_try_content_purchase_button',
      archive_id: archiveId,
      amount,
    })

    setIsLoading(true)
    try {
      const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY ?? 'test_ck_코드'

      const tossPayments = await loadTossPayments(clientKey)
      const payment = tossPayments.payment({ customerKey: ANONYMOUS })
      const result = await postOrder([Number(archiveId)])

      if (result.success && result.data?.data) {
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
          customerEmail,
          customerName,
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
  }, [isLoading, pushEvent, archiveId, amount, error])

  return (
    <div className="desktop:static desktop:p-0 fixed bottom-0 left-0 z-50 w-full border-t border-gray-100 bg-white p-5">
      <Button id="click_try_content_purchase_button" disabled={!agreedToTerms || isLoading} onClick={handlePayment}>
        {isLoading ? t('payment:content.payButton.preparing') : t('payment:content.payButton.pay')}
      </Button>
    </div>
  )
}
