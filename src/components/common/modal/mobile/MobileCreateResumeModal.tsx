'use client'
import { Header } from '@/components/common'
import { ProgressBar } from '@/components/spec'
import { useState } from 'react'
import InfoMobile from '@/components/resume/InfoMobile'
import TemplateMobile from '@/components/resume/TemplateMobile'
import { useTranslation } from 'react-i18next'

interface MobileCreateResumeModalProps {
  lang: string
}

export default function MobileCreateResumeModal({ lang }: MobileCreateResumeModalProps) {
  const { t } = useTranslation(['modal'])
  const [currentStep, setCurrentStep] = useState<'1' | '2'>('1')
  const [currentLabel, setCurrentLabel] = useState<string>(t('create_resume.body.steps.step_1'))

  const steps = [
    { stepLabel: t('create_resume.body.steps.step_1'), stepNumber: '1' },
    { stepLabel: t('create_resume.body.steps.step_2'), stepNumber: '2' },
  ]

  return (
    <div className="desktop:hidden tablet:hidden fixed inset-0 z-50 h-full w-full overflow-y-auto bg-white">
      <Header headerType={'dynamic'} currentLng={lang} title={t('create_resume.header.title')} />
      <div className="flex w-full flex-col gap-y-[32px] px-[20px] py-[24px]">
        <ProgressBar currentLabel={currentLabel} currentStep={currentStep} steps={steps} />

        {currentStep === '1' ? (
          <InfoMobile currentStep={currentStep} setCurrentStep={setCurrentStep} setCurrentLabel={setCurrentLabel} />
        ) : (
          <TemplateMobile currentStep={currentStep} setCurrentStep={setCurrentStep} setCurrentLabel={setCurrentLabel} />
        )}
      </div>
    </div>
  )
}
