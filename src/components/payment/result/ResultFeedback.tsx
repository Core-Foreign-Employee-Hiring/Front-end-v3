import { PaymentSuccessIcon } from '@/assets/svgComponents'

export default function ResultFeedback() {
  return (
    <div className="flex flex-col items-center justify-center gap-y-2">
      <PaymentSuccessIcon width={60} height={60} />
      <div className="kr-title-lg">결제 완료</div>
      <p className="kr-body-md text-gray5 text-center whitespace-pre">{`구매해주셔서 감사합니다.\n한국 취업에 큰 도움이 되길 바랍니다.`}</p>
    </div>
  )
}
