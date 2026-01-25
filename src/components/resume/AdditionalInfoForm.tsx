import TitleField from '@/components/resume/info-form/TitleField'
import SelfIntroField from '@/components/resume/info-form/SelfIntroField'
import UrlList from '@/components/resume/info-form/UrlList'
import { Spacing } from '@/components/common'

export default function AdditionalInfoForm() {
  return (
    <div className="w-full">
      <TitleField />
      <Spacing height={20} />

      <SelfIntroField />
      <Spacing height={20} />

      <UrlList />
    </div>
  )
}
