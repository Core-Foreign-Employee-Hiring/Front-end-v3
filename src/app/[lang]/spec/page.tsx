import Label from '@/components/common/Label'
import Spacing from '@/components/common/Spacing'
import ProgressBar from '@/components/Spec/ProgressBar'
import EducationInfo from '@/components/Spec/EducationInfo'

export default function SpecPage() {
  return (
    <main className="w-full">
      <Label label={'스펙입력'} className="kr-title-lg" />
      <Spacing height={20} />

      <ProgressBar />
      <Spacing height={20} />

      <EducationInfo />
    </main>
  )
}
