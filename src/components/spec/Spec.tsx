import {
  ProgressBar,
  SpecActivity,
  SpecCareer,
  SpecCertification,
  SpecEducation,
  SpecLanguage,
} from '@/components/spec/index'
import { Spacing } from '@/components/common'
import { StepType } from '@/app/[lang]/carrer/page'
import { fetchSpecData } from '@/lib/server/spec'
import { SpecType } from '@/types/spec'

function FindSpecProcessStepSwitcher({ step, specData }: { step: StepType; specData: SpecType | undefined }) {
  if (step === '1') return <SpecEducation educationData={specData?.education} />
  if (step === '2') return <SpecLanguage />
  if (step === '3') return <SpecCertification />
  if (step === '4') return <SpecCareer />
  if (step === '5') return <SpecActivity />
  return <SpecEducation educationData={specData?.education} />
}

interface SpecProps {
  step: StepType
}

export default async function Spec({ step }: SpecProps) {
  const result = await fetchSpecData()
  const specData = result.data

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
    <div>
      <ProgressBar currentStep={step} currentLabel={getCurrentLabel(step, steps)} steps={steps} />
      <Spacing height={20} />

      <FindSpecProcessStepSwitcher step={step} specData={specData} />
    </div>
  )
}
