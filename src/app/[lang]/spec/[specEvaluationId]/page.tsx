import { Label, Spacing } from '@/components/common'
import Chat from '@/components/spec/result/Chat'
import ResultContent from '@/components/spec/result/ResultContent'
import CTAButton from '@/components/spec/result/CTAButton'
import { fetchSpecResult } from '@/lib/server/spec'

interface SpecResultProps {
  params: Promise<{ specEvaluationId: string }>
}

export default async function SpecResult({ params }: SpecResultProps) {
  const { specEvaluationId } = await params

  const specResultResponse = await fetchSpecResult(specEvaluationId)
  const specResult = specResultResponse.data

  const ctaButtons: { step: '2' | '3' | '4'; content: string; path: '/' }[] = [
    { step: '2', content: '이력서 자동 생성', path: '/' },
    { step: '3', content: 'KORFIT AI 면접 준비', path: '/' },
    { step: '4', content: '취업 성공한 선배님들과 멘토링', path: '/' },
  ]

  return (
    <main>
      <Label label={'스펙 결과'} type={'titleLg'} />

      <div className="flex gap-x-[24px]">
        <Chat specResult={specResult} />
        <ResultContent analysis={specResult?.analysis} topPercent={specResult?.topPercent} />
      </div>

      <Spacing height={37} />
      <div className="flex gap-x-6">
        {ctaButtons.map((ctaButton) => (
          <CTAButton key={ctaButton.step} step={ctaButton.step} path={ctaButton.path} stepContent={ctaButton.content} />
        ))}
      </div>
    </main>
  )
}
