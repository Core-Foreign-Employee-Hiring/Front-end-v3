import { ProgressBar, SpecCareer, SpecCertification, SpecEducation, SpecLanguage } from '@/components/spec/index'
import { Spacing } from '@/components/common'
import { StepType } from '@/app/[lang]/carrer/page'
import { fetchSpecData } from '@/lib/server/spec'
import { SpecType } from '@/types/spec'
import SpecExperience from '@/components/spec/experience/SpecExperience'
import SpecAward from '@/components/spec/award/SpecAward'
import { getTranslationServer } from '@/lib/i18n'
import { Locale } from '@/lib/i18n.types'

function FindSpecProcessStepSwitcher({ step, specData }: { step: StepType; specData: SpecType | undefined }) {
  if (step === '1') return <SpecEducation educationData={specData?.education} />
  if (step === '2') return <SpecLanguage languageSkillsData={specData?.languageSkills} />
  if (step === '3') return <SpecCertification certificationsData={specData?.certifications} />
  if (step === '4') return <SpecCareer careersData={specData?.careers} />
  if (step === '5') return <SpecAward awardsData={specData?.awards} />
  if (step === '6') return <SpecExperience experiencesData={specData?.experiences} />

  return <SpecEducation educationData={specData?.education} />
}

interface SpecProps {
  step: StepType
  lang: Locale
}

export default async function Spec({ step, lang }: SpecProps) {
  const result = await fetchSpecData()
  const specData = result.data
  const { t } = await getTranslationServer(lang, ['spec'])

  const steps = [
    { stepNumber: '1', stepLabel: t('spec:home.education.title') },
    { stepNumber: '2', stepLabel: t('spec:home.language.title') },
    { stepNumber: '3', stepLabel: t('spec:home.certification.title') },
    { stepNumber: '4', stepLabel: t('spec:home.career.title') },
    { stepNumber: '5', stepLabel: t('spec:home.award.title') },
    { stepNumber: '6', stepLabel: t('spec:home.experience.title') },
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
