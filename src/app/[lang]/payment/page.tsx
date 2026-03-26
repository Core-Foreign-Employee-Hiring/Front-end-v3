import ContentSummary from '@/components/payment/ContentSummary'
import { BottomBorder } from '@/components/common'
import OrderInfo from '@/components/payment/OrderInfo'
import PaymentMethod from '@/components/payment/PaymentMethod'
import PayButton from '@/components/payment/PayButton'
import PaySummary from '@/components/payment/PaySummary'

export default function PaymentPage() {
  return (
    <main className="desktop:flex-row flex flex-col gap-x-[45px] gap-y-[24px]">
      <section className="flex w-full flex-col gap-y-[24px]">
        <h1 className="kr-title-md desktop:block hidden text-black">콘텐츠 구매</h1>
        <ContentSummary />

        <BottomBorder height={6} color={'gray1'} />
        <OrderInfo />

        <BottomBorder height={6} color={'gray1'} />
        <PaymentMethod />
      </section>

      <section className="desktop:w-[384px] flex w-full shrink-0 flex-col gap-y-5">
        <PaySummary />
        <PayButton />
      </section>
    </main>
  )
}
