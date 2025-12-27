import { I18nParams } from '@/lib/i18n.types'
import { SearchParams } from 'next/dist/server/request/search-params'
import {
  ProgressBar,
  SpecCareer,
  SpecCertification,
  SpecEducation,
  SpecExperience,
  SpecLanguage,
} from '@/components/spec'
import { Label, Spacing } from '@/components/common'

export type StepType = '1' | '2' | '3' | '4' | '5'

/**
 * 'step' 에 따라 올바른 컴포넌트를 반환하는 스위처 컴포넌트
 */
function FindSpecProcessStepSwitcher({ step }: { step: StepType }) {
  if (step === '1') return <SpecEducation />
  if (step === '2') return <SpecLanguage />
  if (step === '3') return <SpecCertification />
  if (step === '4') return <SpecCareer />
  if (step === '5') return <SpecExperience />
  return <SpecEducation />
}

export default async function SpecPage({ searchParams }: { params: Promise<I18nParams>; searchParams: SearchParams }) {
  const resolvedSearchParams = await searchParams
  const step = (resolvedSearchParams.step as StepType) || '1'

  const steps = [
    { stepNumber: '1', stepLabel: '학력' },
    { stepNumber: '2', stepLabel: '어학 능력' },
    { stepNumber: '3', stepLabel: '자격증' },
    { stepNumber: '4', stepLabel: '경력' },
    { stepNumber: '5', stepLabel: '수상 및 기타 경험' },
  ]

  const getCurrentLabel = (step: StepType, steps: { stepNumber: string; stepLabel: string }[]) => {
    return steps.find((item) => item.stepNumber === step)?.stepLabel || ''
  }

  return (
    <main className="w-full">
      <Label label={'스펙입력'} className="kr-title-lg desktop:block hidden" />
      <Spacing height={20} className="desktop:block hidden" />

      <ProgressBar currentStep={step} currentLabel={getCurrentLabel(step, steps)} steps={steps} />
      <Spacing height={20} />

      <FindSpecProcessStepSwitcher step={step} />
    </main>
  )
}
