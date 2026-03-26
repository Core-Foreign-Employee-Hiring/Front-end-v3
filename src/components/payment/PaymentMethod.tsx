'use client'

import { TossPaymentIcon } from '@/assets/svgComponents'
import ToggleButton from '@/components/common/ToggleButton'

export default function PaymentMethod() {
  return (
    <div className="flex flex-col gap-y-4">
      <h2 className="kr-subtitle-lg">결제 수단 선택</h2>
      <section className="flex gap-x-2">
        <ToggleButton type={'SELECT'} onClick={() => {}} />
        <TossPaymentIcon height={20} width={122} />
      </section>
    </div>
  )
}
