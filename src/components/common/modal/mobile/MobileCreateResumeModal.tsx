import { Header } from '@/components/common'
import { ProgressBar } from '@/components/spec'
import { useState } from 'react'
import InfoMobile from '@/components/resume/InfoMobile'
import TemplateMobile from '@/components/resume/TemplateMobile'

interface MobileCreateResumeModalProps {
  lang: string
}

export default function MobileCreateResumeModal({ lang }: MobileCreateResumeModalProps) {
  const [currentStep, setCurrentStep] = useState<'1' | '2'>('1')
  const [currentLabel, setCurrentLabel] = useState<'이력서 내용 입력' | '템플릿 선택'>('이력서 내용 입력')

  const steps = [
    { stepLabel: '이력서 내용 입력', stepNumber: '1' },
    { stepLabel: '템플릿 선택', stepNumber: '2' },
  ]

  return (
    <div className="desktop:hidden tablet:hidden fixed inset-0 z-50 h-full w-full overflow-y-auto bg-white">
      <Header headerType={'dynamic'} currentLng={lang} title={'새이력서 작성'} />
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
