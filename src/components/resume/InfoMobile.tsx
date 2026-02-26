import ProfileImageUploader from '@/components/resume/ProfileImageUploader'
import TitleField from '@/components/resume/info-form/TitleField'
import SelfIntroField from '@/components/resume/info-form/SelfIntroField'
import UrlList from '@/components/resume/info-form/UrlList'
import MobileBottomButton from '@/components/resume/MobileBottomButton'
import { Dispatch, SetStateAction } from 'react'
import { Spacing } from '@/components/common'

interface InfoMobileProps {
  currentStep: '1' | '2'
  setCurrentStep: Dispatch<SetStateAction<'1' | '2'>>
  setCurrentLabel: Dispatch<SetStateAction<string>>
}

export default function InfoMobile({ currentStep, setCurrentStep, setCurrentLabel }: InfoMobileProps) {
  return (
    <div className="flex flex-col gap-y-[32px]">
      <ProfileImageUploader />
      <TitleField />
      <SelfIntroField />
      <UrlList />
      <Spacing height={80} />
      <MobileBottomButton currentStep={currentStep} setCurrentLabel={setCurrentLabel} setCurrentStep={setCurrentStep} />
    </div>
  )
}
