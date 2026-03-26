import { Label } from '@/components/common'

export default function PaymentResultSummary() {
  return (
    <div className="border-gray2 flex flex-col gap-y-4 rounded-[12px] border p-4">
      <Label label={'콘텐츠명'} type={'subtitleLg'} />

      <section className="flex items-center justify-between">
        <div className="text-gray5 kr-subtitle-md flex">주문번호</div>
        <div className="kr-title-sm flex">000000000000</div>
      </section>

      <section className="flex items-center justify-between">
        <div className="text-gray5 kr-subtitle-md flex">결제금액</div>
        <div className="kr-subtitle-lg text-main-500">99,550원</div>
      </section>
    </div>
  )
}
