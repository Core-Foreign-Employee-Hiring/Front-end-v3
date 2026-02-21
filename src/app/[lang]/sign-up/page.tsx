import { LogoIcon } from '@/assets/svgComponents'
import { Label, Spacing } from '@/components/common'
import { ProgressBar } from '@/components/spec'
import RegisterStep1 from '@/components/sign-up/RegisterStep1'
import RegisterStep2 from '@/components/sign-up/RegisterStep2'
import { getTranslationServer } from '@/lib/i18n'
import { Locale } from '@/lib/i18n.types'

export type StepType = '1' | '2'

function FindRegisterStepSwitcher({ step, lang }: { step: StepType; lang: string }) {
  if (step === '1') return <RegisterStep1 lang={lang} />
  if (step === '2') return <RegisterStep2 lang={lang} />
  return <RegisterStep1 lang={lang} />
}

export default async function SignUpPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: Locale }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { lang } = await params
  const { t } = await getTranslationServer(lang, 'signup')

  const steps = [
    { stepNumber: '1', stepLabel: t('menu.step1') },
    { stepNumber: '2', stepLabel: t('menu.step2') },
  ]
  const resolvedSearchParams = await searchParams

  const step = (resolvedSearchParams.step as StepType) || '1'

  const getCurrentLabel = (step: '1' | '2', steps: { stepNumber: string; stepLabel: string }[]) => {
    return steps.find((item) => item.stepNumber === step)?.stepLabel || ''
  }
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center">
      <div className="desktop:w-[600px] flex w-full flex-col items-center justify-center">
        <div className="desktop:flex hidden flex-col items-center justify-center">
          <LogoIcon width={200} height={60} />
          <Spacing height={80} />
          <Label label={t('title')} type={'titleLg'} />
          <Spacing height={20} />
        </div>
        <ProgressBar currentStep={'1'} currentLabel={getCurrentLabel('1', steps)} steps={steps} />
        <Spacing height={40} />
        <FindRegisterStepSwitcher lang={lang} step={step} />
      </div>
    </main>
  )
}
