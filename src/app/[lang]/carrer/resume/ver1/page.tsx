import IntroVer1 from '@/components/resume/template/ver1/IntroVer1'
import EducationVer1 from '@/components/resume/template/ver1/EducationVer1'
import WorkExperienceVer1 from '@/components/resume/template/ver1/WorkExperienceVer1'
import AchievementsVer1 from '@/components/resume/template/ver1/AchievementsVer1'
import CertificationsVer1 from '@/components/resume/template/ver1/CertificationsVer1'
import LanguageSkillsVer1 from '@/components/resume/template/ver1/LanguageSkillsVer1'
import URLsVer1 from '@/components/resume/template/ver1/URLsVer1'
import { PageLayout } from '@/components/common'

export default function ResumeVer1Page() {
  return (
    <div className="w-full">
      <IntroVer1 />
      <PageLayout>
        <WorkExperienceVer1 />
        <EducationVer1 />
        <AchievementsVer1 />
        <CertificationsVer1 />
        <LanguageSkillsVer1 />
        <URLsVer1 />
      </PageLayout>
    </div>
  )
}
