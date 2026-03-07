import { Locale } from '@/lib/i18n.types'
import SpecHome from '@/components/spec/SpecHome'
import SpecForm from '@/components/spec/SpecForm'
import { SpecType, StepType } from '@/app/[lang]/career/page'

function FindSpecProcessStepSwitcher({ type, step, lang }: { type: SpecType; step: StepType; lang: Locale }) {
  if (type === 'home') return <SpecHome />
  if (type === 'form') return <SpecForm step={step} lang={lang} />

  return <SpecHome />
}

interface SpecProps {
  type: SpecType
  step: StepType
  lang: Locale
}

export default async function Spec({ type, step, lang }: SpecProps) {
  return (
    <div>
      <FindSpecProcessStepSwitcher type={type} step={step} lang={lang} />
    </div>
  )
}
