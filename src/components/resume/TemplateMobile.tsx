'use client'

import SelectTemplateItem from '@/components/resume/template/SelectTemplateItem'
import { useResumeStore } from '@/store/resumeStore'
import MobileBottomButton from '@/components/resume/MobileBottomButton'
import { Dispatch, SetStateAction } from 'react'

interface TemplateMobileProps {
  currentStep: '1' | '2'
  setCurrentStep: Dispatch<SetStateAction<'1' | '2'>>
  setCurrentLabel: Dispatch<SetStateAction<string>>
}

export default function TemplateMobile({ currentStep, setCurrentStep, setCurrentLabel }: TemplateMobileProps) {
  const { setSelectedType, selectedType } = useResumeStore((state) => state)

  return (
    <div className="flex flex-col gap-y-[32px]">
      <SelectTemplateItem
        type={'ver1'}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        imageUrl={'/template-ver1.png'}
      />
      <SelectTemplateItem
        type={'ver2'}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        imageUrl={'/template-ver2.png'}
      />
      <MobileBottomButton setCurrentStep={setCurrentStep} currentStep={currentStep} setCurrentLabel={setCurrentLabel} />
    </div>
  )
}
