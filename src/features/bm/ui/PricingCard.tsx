import { Button } from '@/components/common'
import { CheckIcon } from '@/assets/svgComponents'

function FeatureItem({ label }: { label: string }) {
  return (
    <li className="flex items-center gap-x-2">
      <CheckIcon width={24} height={24} aria-hidden />
      <p className="kr-subtitle-md text-gray5 whitespace-pre-wrap">{label}</p>
    </li>
  )
}

interface PricingCardProps {
  planName: 'Free' | 'Pro'
  price: string
  description: string
  features: readonly string[]
  isCurrentPlan?: boolean
}

export default function PricingCard({
  planName,
  price,
  description,
  isCurrentPlan = false,
  features,
}: PricingCardProps) {
  return (
    <div
      className={`${isCurrentPlan ? 'border-gray3 border' : 'border-main-300 border-2'} flex w-[335px] flex-col gap-y-10 rounded-[24px] p-6`}
    >
      {/* 플랜 정보 */}
      <section className="flex flex-col gap-y-5">
        <div className="flex flex-col gap-y-1">
          <span className="kr-resume-lg-light text-main-800">{planName}</span>
          <strong className="kr-resume-lg">{price}</strong>
        </div>
        <p className="kr-subtitle-lg">{description}</p>
      </section>

      {/* CTA 버튼 */}
      <Button variant={isCurrentPlan ? 'secondary' : 'primary'} state={isCurrentPlan ? 'disable' : 'default'}>
        {isCurrentPlan ? '현재 플랜' : '플랜 시작하기'}
      </Button>

      {/* 기능 목록 */}
      <ul className="flex flex-col items-start gap-y-5" aria-label={`${planName} 플랜 포함 기능`}>
        {features.map((feature, index) => (
          <FeatureItem key={index} label={feature} />
        ))}
      </ul>
    </div>
  )
}
