import { Label, Spacing } from '@/components/common'

interface InterviewResultHeaderProps {
  score: number
}

export default function InterviewResultHeader({ score }: InterviewResultHeaderProps) {
  return (
    <div>
      <Label label={'면접 평균 역량'} labelColor={'text-gray5'} type={'button'} />
      <Spacing height={20} />
      <div className="flex items-end justify-between">
        <h4 className="kr-title-md">{score}점</h4>
        <p className="kr-title-sm text-error">-1점</p>
      </div>
    </div>
  )
}
