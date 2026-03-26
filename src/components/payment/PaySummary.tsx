import { UncheckIcon } from '@/assets/svgComponents'

export default function PaySummary() {
  return (
    <div className="flex flex-col gap-y-[24px]">
      <section className="border-gray2 rounded-[12px] border p-4">
        <section className="desktop:border-gray2 desktop:border-b desktop:pb-[20px] flex flex-col">
          <h2 className="kr-title-md">결제 금액</h2>
          <section className="mt-[32px] flex flex-col gap-y-2">
            <div className="flex items-center justify-between">
              <div className="kr-subtitle-md text-gray5">주문 금액</div>
              <p className="kr-title-sm">128,660원</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="kr-subtitle-md text-gray5">얼리버드 할인(40%)</div>
              <p className="kr-title-sm text-error">-3000원</p>
            </div>
          </section>
          <section className="mt-[20px] flex items-center justify-between">
            <p className="kr-subtitle-lg">총 결제 금액</p>
            <p className="kr-subtitle-lg text-main-500">99,550원</p>
          </section>
        </section>

        <section className="desktop:flex mt-[20px] hidden flex-col gap-y-4">
          <div className="flex items-center gap-x-2">
            <UncheckIcon width={20} height={20} />
            <p className="kr-subtitle-md text-gray5">결제 서비스 이용약관, 개인정보 처리 동의 (필수)</p>
          </div>
          <p className="kr-body-sm text-gray4">
            회원 본인은 주문내용을 확인하였으며, 유료 서비스 이용약관 및 개인정보처리방침과 결제에 동의합니다.
          </p>
        </section>
      </section>

      <section className="desktop:hidden flex flex-col gap-y-4">
        <div className="flex items-center gap-x-2">
          <UncheckIcon width={20} height={20} />
          <p className="kr-subtitle-md text-gray5">결제 서비스 이용약관, 개인정보 처리 동의 (필수)</p>
        </div>
        <p className="kr-body-sm text-gray4">
          회원 본인은 주문내용을 확인하였으며, 유료 서비스 이용약관 및 개인정보처리방침과 결제에 동의합니다.
        </p>
      </section>
    </div>
  )
}
