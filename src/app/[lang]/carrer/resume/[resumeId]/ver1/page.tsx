import IntroVer1 from '@/components/resume/template/ver1/IntroVer1'
import { Header, Loading, PageLayout, Spacing } from '@/components/common'
import WorkExperienceVer1 from '@/components/resume/template/ver1/WorkExperienceVer1'
import EducationVer1 from '@/components/resume/template/ver1/EducationVer1'
import CertificationsVer1 from '@/components/resume/template/ver1/CertificationsVer1'
import LanguageSkillsVer1 from '@/components/resume/template/ver1/LanguageSkillsVer1'
import URLsVer1 from '@/components/resume/template/ver1/URLsVer1'
import { fetchResumeResult } from '@/lib/server/resume'
import BottomButton from '@/components/resume/template/BottomButton'
import AchievementsVer1 from '@/components/resume/template/ver1/AchievementsVer1'

export default async function ResumeVer1Page({ params }: { params: Promise<{ lang: string; resumeId: string }> }) {
  const { lang, resumeId } = await params
  const result = await fetchResumeResult(resumeId)
  const resumeData = result.data

  if (!resumeData) {
    return <Loading size={'lg'} />
  }

  return (
    <main>
      <Header headerType={'default'} currentLng={lang} />
      <div id="resume-print-area">
        <div className="w-full">
          <IntroVer1
            memberBasicInfo={resumeData?.memberBasicInfo}
            introduction={resumeData?.introduction}
            profileImageUrl={resumeData?.profileImageUrl}
          />
          <PageLayout>
            {resumeData.careers.length !== 0 && <WorkExperienceVer1 careers={resumeData.careers} />}
            {resumeData.educations.length !== 0 && <EducationVer1 educations={resumeData.educations} />}
            {resumeData.awards.length !== 0 && resumeData.experiences.length !== 0 ? null : (
              <AchievementsVer1 awards={resumeData.awards} experiences={resumeData.experiences} />
            )}
            {resumeData.certifications.length !== 0 && (
              <CertificationsVer1 certifications={resumeData.certifications} />
            )}
            {resumeData.languageSkills.length !== 0 && (
              <LanguageSkillsVer1 languageSkills={resumeData.languageSkills} />
            )}
            {resumeData.urls.length !== 0 && <URLsVer1 urls={resumeData.urls} />}
          </PageLayout>
        </div>
      </div>

      <Spacing height={92} />
      <BottomButton targetId="resume-print-area" />
    </main>
  )
}
