import { Label, Spacing } from '@/components/common'
import { ProgressBar } from '@/components/spec'
import RecruitInfoForm from '@/components/create-job-post/RecruitInfoForm'
import RecruitDetailForm from '@/components/create-job-post/RecruitDetailForm'
import CompanyInfoForm from '@/components/create-job-post/CompanyInfoForm'
import BottomButtons from '@/components/create-job-post/BottomButtons'

export type CreateJobPostStepType = '1' | '2' | '3'

function FindCreateJobPostProcessStepSwitcher({ step }: { step: CreateJobPostStepType }) {
  if (step === '1') return <RecruitInfoForm />
  if (step === '2') return <RecruitDetailForm />
  if (step === '3') return <CompanyInfoForm />
  return <RecruitInfoForm />
}
interface CreateJobPostProps {
  params: Promise<{ lang: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function CreateJobPost({ params, searchParams }: CreateJobPostProps) {
  const { lang } = await params
  const sParams = await searchParams
  const step = (sParams.step as CreateJobPostStepType) || '1'
  const steps = [
    { stepLabel: '공고 정보 입력', stepNumber: '1' },
    { stepLabel: '공고 상세 입력', stepNumber: '2' },
    { stepLabel: '회사 정보 입력', stepNumber: '3' },
  ]

  const getCurrentLabel = (step: CreateJobPostStepType, steps: { stepNumber: string; stepLabel: string }[]) => {
    return steps.find((item) => item.stepNumber === step)?.stepLabel || ''
  }

  return (
    <main>
      <Label label={'공고등록'} type={'titleLg'} />
      <Spacing height={20} />

      <ProgressBar steps={steps} currentStep={step} currentLabel={getCurrentLabel(step, steps)} />
      <Spacing height={20} />

      <FindCreateJobPostProcessStepSwitcher step={step} />

      <Spacing height={80} />
      <BottomButtons currentStep={step} lang={lang} />
    </main>
  )
}
