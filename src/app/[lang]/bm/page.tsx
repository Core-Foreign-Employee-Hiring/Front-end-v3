import PricingCard from '@/features/bm/ui/PricingCard'
import { FREE_PLAN_FEATURES, PRO_PLAN_FEATURES } from '@/features/bm/constants'

export default function BMPage() {
  return (
    <main>
      <section className="flex gap-x-[40px]">
        <PricingCard
          planName="Free"
          isCurrentPlan
          price="0원"
          description="취업 준비를 시작하는 기본 플랜"
          features={FREE_PLAN_FEATURES}
        />
        <PricingCard
          planName="Pro"
          price="9,900원"
          description="합격을 위한 실전 취업 준비 플랜"
          features={PRO_PLAN_FEATURES}
        />
      </section>
    </main>
  )
}
