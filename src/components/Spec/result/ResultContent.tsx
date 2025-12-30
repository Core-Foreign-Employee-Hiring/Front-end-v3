import { Spacing } from '@/components/common'

interface ResultContentProps {
  topPercent: number | undefined
  analysis: string | undefined
}

export default function ResultContent({ topPercent, analysis }: ResultContentProps) {
  return (
    <div className="flex flex-col">
      <div className="kr-title-md">
        황유림님은 상위
        <p className="text-main-500">{topPercent}%</p>
      </div>
      <Spacing height={16} />
      <p>{analysis}</p>
    </div>
  )
}
