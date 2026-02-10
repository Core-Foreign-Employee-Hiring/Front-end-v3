import { fetchResumeResult } from '@/lib/server/resume'
import { PageLayout, Spacing } from '@/components/common'
import IntroVer1 from '@/components/resume/template/ver1/IntroVer1'
import WorkExperienceVer1 from '@/components/resume/template/ver1/WorkExperienceVer1'
import EducationVer1 from '@/components/resume/template/ver1/EducationVer1'
import AchievementsVer1 from '@/components/resume/template/ver1/AchievementsVer1'
import CertificationsVer1 from '@/components/resume/template/ver1/CertificationsVer1'
import LanguageSkillsVer1 from '@/components/resume/template/ver1/LanguageSkillsVer1'
import URLsVer1 from '@/components/resume/template/ver1/URLsVer1'
import BottomButton from '@/components/resume/template/BottomButton'

export default async function ResumeVer2Page({ params }: { params: Promise<{ lang: string; resumeId: string }> }) {
  const { lang, resumeId } = await params
  const result = await fetchResumeResult(resumeId)
  const resumeData = result.data

  return (
    <main>
      <div id="resume-print-area">
        <div className="w-full">
          <IntroVer1
            memberBasicInfo={resumeData?.memberBasicInfo}
            introduction={resumeData?.introduction}
            profileImageUrl={resumeData?.profileImageUrl}
          />
          <PageLayout>
            <WorkExperienceVer1 careers={resumeData?.careers} />
            <EducationVer1 educations={resumeData?.educations} />
            <AchievementsVer1 awards={resumeData?.awards} experiences={resumeData?.experiences} />
            <CertificationsVer1 certifications={resumeData?.certifications} />
            <LanguageSkillsVer1 languageSkills={resumeData?.languageSkills} />
            <URLsVer1 urls={resumeData?.urls} />
          </PageLayout>
        </div>
      </div>

      <Spacing height={92} />
      <BottomButton targetId="resume-print-area" />
    </main>
  )
}
