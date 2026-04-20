import PricingCard from '@/features/bm/ui/PricingCard'
import { FREE_PLAN_FEATURES, PRO_PLAN_FEATURES } from '@/features/bm/constants'
import Link from 'next/link'

const REFUND_POLICY_URL = 'https://fifth-soil-7ed.notion.site/335244b92af280b082edd35df86803d7'

const PLAN_CONFIGS = [
  {
    planName: 'Free' as const,
    price: '0원',
    description: '취업 준비를 시작하는 기본 플랜',
    features: FREE_PLAN_FEATURES,
    isCurrentPlan: true,
  },
  {
    planName: 'Pro' as const,
    price: '9,900원',
    description: '합격을 위한 실전 취업 준비 플랜',
    features: PRO_PLAN_FEATURES,
  },
] as const

export default function BMPage() {
  return (
    <main className="desktop:gap-y-[40px] flex flex-col items-center justify-center gap-y-[20px]">
      {/* 헤더 */}
      <section className="flex flex-col items-center gap-y-1">
        <h1 className="tablet:kr-resume-lg">Choose Your Career Plan</h1>
        <p className="kr-subtitle-md tablet:kr-subtitle-lg desktop:kr-resume-md-light text-gray5 text-center whitespace-pre-wrap">
          {`취업 준비를 넘어, 합격까지 이어지는\n맞춤형 플랜을 선택하세요`}
        </p>
      </section>

      {/* 플랜 카드 목록 */}
      <section className="tablet:grid-cols-2 desktop:grid-cols-2 grid grid-cols-1 gap-x-10 gap-y-5">
        {PLAN_CONFIGS.map((plan) => (
          <PricingCard key={plan.planName} {...plan} />
        ))}
      </section>

      {/* 환불 정책 안내 */}
      <p className="text-gray4 kr-button tablet:kr-subtitle-md desktop:kr-subtitle-md mt-[12px]">
        위 플랜을 선택할 경우{' '}
        <Link href={REFUND_POLICY_URL} className="text-main-500 underline" target="_blank" rel="noopener noreferrer">
          환불정책
        </Link>
        에 동의한 것으로 간주합니다
      </p>
    </main>
  )
}
