import ContentSummary from '@/components/payment/ContentSummary'
import { BottomBorder, Loading } from '@/components/common'
import OrderInfo from '@/components/payment/OrderInfo'
import PaymentMethod from '@/components/payment/PaymentMethod'
import PayButton from '@/components/payment/PayButton'
import PaySummary from '@/components/payment/PaySummary'
import { serverFetchPreview } from '@/lib/server/payment'

export default async function PaymentPage({
  params,
}: Readonly<{
  params: Promise<{ lang: string; id: string }>
}>) {
  const { id, lang } = await params
  const paymentResult = await serverFetchPreview({ passArchiveId: id })
  const paymentData = paymentResult.data

  if (!paymentData) return <Loading size={'md'} />

  return (
    <main className="desktop:flex-row flex flex-col gap-x-[45px] gap-y-[24px]">
      <section className="flex w-full flex-col gap-y-[24px]">
        <h1 className="kr-title-md desktop:block hidden text-black">콘텐츠 구매</h1>
        <ContentSummary
          amount={paymentData.amount}
          oneLineReview={paymentData.oneLineReview}
          title={paymentData.title}
          thumbnailUrl={paymentData.thumbnailUrl}
        />

        <BottomBorder height={6} color={'gray1'} />
        <OrderInfo email={paymentData.email} phoneNumber={paymentData.phoneNumber} name={paymentData.name} />

        <BottomBorder height={6} color={'gray1'} />
        <PaymentMethod />
      </section>

      <section className="desktop:w-[384px] flex w-full shrink-0 flex-col gap-y-5">
        <PaySummary amount={paymentData.amount} />
        <PayButton
          archiveId={id}
          amount={paymentData.amount}
          customerEmail={paymentData.email}
          customerName={paymentData.name}
        />
      </section>
    </main>
  )
}
