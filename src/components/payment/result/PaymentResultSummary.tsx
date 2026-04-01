'use client'

import { useTranslation } from 'react-i18next'

interface PaymentResultSummaryProps {
  orderId: string
  amount: string
}

export default function PaymentResultSummary({ orderId, amount }: PaymentResultSummaryProps) {
  const { t } = useTranslation('payment')

  // 숫자로 변환 후 콤마(,) 포맷팅 (예: 10000 -> 10,000)
  const formattedAmount = new Intl.NumberFormat('ko-KR').format(Number(amount))

  return (
    <div className="border-gray2 flex flex-col gap-y-4 rounded-[12px] border p-4">
      <section className="flex items-center justify-between">
        <div className="text-gray5 kr-subtitle-md flex">{t('success.orderId')}</div>
        <div className="kr-title-sm flex text-black">{orderId}</div>
      </section>

      <section className="flex items-center justify-between">
        <div className="text-gray5 kr-subtitle-md flex">{t('success.amount')}</div>
        <div className="kr-subtitle-lg text-main-500 font-bold">
          {t('success.amountValue', { amount: formattedAmount })}
        </div>
      </section>
    </div>
  )
}
