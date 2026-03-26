import ResultFeedback from '@/components/payment/result/ResultFeedback'
import PaymentResultSummary from '@/components/payment/result/PaymentResultSummary'
import CTAButtons from '@/components/payment/result/CTAButtons'

export default function FailPage() {
  return (
    <div className="grid h-[calc(80dvh-64px)] place-items-center">
      <section className="flex w-[588px] flex-col gap-y-[24px]">
        <ResultFeedback />
        <PaymentResultSummary />
        <CTAButtons />
      </section>
    </div>
  )
}
