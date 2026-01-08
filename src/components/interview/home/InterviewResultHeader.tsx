import { Label, Spacing } from '@/components/common'

interface InterviewResultHeaderProps {
  score: number
}

export default function InterviewResultHeader({ score }: InterviewResultHeaderProps) {
  const getStrictEvaluation = (score: number) => {
    if (score >= 98) return { label: '상위 1%', text: '독보적인 수준, 결점이 거의 없음', color: '#1D4ED8' }
    if (score >= 94) return { label: '상위 10%', text: '최상위권이나 완벽하진 않음', color: '#3B3DFF' }
    if (score >= 85) return { label: '상위 25%', text: '우수하지만 경쟁력 보완 필요', color: '#2DD4BF' }
    if (score >= 70) return { label: '중위권', text: '평범함, 냉정하게 특징이 부족함', color: '#FACC15' }
    if (score >= 50) return { label: '하위 30%', text: '전반적인 기초 역량 재검토 필요', color: '#FB923C' }
    return { label: '하위 10%', text: '실전 투입이 어려움', color: '#FF4D4F' }
  }

  const evaluation = getStrictEvaluation(score)

  return (
    <div>
      <Label label={'종합 역량 점수'} labelColor={'text-gray5'} type={'button'} />
      <Spacing height={12} />
      <div className="flex items-end justify-between">
        <div className="flex items-end gap-x-1">
          <h4 className="kr-title-md">{score}점</h4>
          <p className="kr-subtitle-md text-gray4">/</p>
          <p className="kr-subtitle-md text-gray4">100점</p>
        </div>

        <p className="kr-title-sm" style={{ color: evaluation.color }}>{`${evaluation.label}, ${evaluation.text}`}</p>
      </div>
    </div>
  )
}
