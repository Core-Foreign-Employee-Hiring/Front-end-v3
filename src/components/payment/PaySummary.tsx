'use client'

import { CheckIcon, UncheckIcon } from '@/assets/svgComponents'
import { useOrderStore } from '@/store/orderStore' // CheckIcon이 있다고 가정합니다.

interface PaySummaryProps {
  amount: string
}

export default function PaySummary({ amount }: PaySummaryProps) {
  return (
    <div className="flex flex-col gap-y-[24px]">
      <section className="border-gray2 rounded-[12px] border p-4">
        <section className="desktop:border-gray2 desktop:border-b desktop:pb-[20px] flex flex-col">
          <h2 className="kr-title-md">결제 금액</h2>
          <section className="mt-[32px] flex flex-col gap-y-2">
            <div className="flex items-center justify-between">
              <div className="kr-subtitle-md text-gray5">주문 금액</div>
              <p className="kr-title-sm">{Number(amount).toLocaleString()}원</p>
            </div>
          </section>

          <section className="mt-[20px] flex items-center justify-between">
            <p className="kr-subtitle-lg">총 결제 금액</p>
            <p className="kr-subtitle-lg text-main-500">{Number(amount).toLocaleString()}원</p>
          </section>
        </section>

        {/* 데스크탑 버전 약관 */}
        <section className="desktop:flex mt-[20px] hidden flex-col">
          <TermsSection />
        </section>
      </section>

      {/* 모바일 버전 약관 */}
      <section className="desktop:hidden flex flex-col">
        <TermsSection />
      </section>
    </div>
  )
}

// 공통 약관 섹션 컴포넌트화 (중복 코드 방지)
function TermsSection() {
  // 스토어에서 상태와 액션 가져오기
  const { agreedToTerms, toggleAgreedToTerms } = useOrderStore()
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex cursor-pointer items-center gap-x-2" onClick={toggleAgreedToTerms}>
        {/* 상태에 따라 아이콘 변경 */}
        {agreedToTerms ? (
          <CheckIcon width={20} height={20} className="text-main-500" />
        ) : (
          <UncheckIcon width={20} height={20} />
        )}
        <p className={`kr-subtitle-md ${agreedToTerms ? 'text-gray9' : 'text-gray5'}`}>
          결제 서비스 이용약관, 개인정보 처리 동의 (필수)
        </p>
      </div>
      <p className="kr-body-sm text-gray4">
        회원 본인은 주문내용을 확인하였으며, 유료 서비스 이용약관 및 개인정보처리방침과 결제에 동의합니다.
      </p>
    </div>
  )
}
