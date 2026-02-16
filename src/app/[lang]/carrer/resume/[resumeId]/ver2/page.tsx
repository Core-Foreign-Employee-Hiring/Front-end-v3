import { fetchResumeResult } from '@/lib/server/resume'
import { Header, Loading, PageLayout, Spacing } from '@/components/common'
import BottomButton from '@/components/resume/template/BottomButton'
import IntroVer2 from '@/components/resume/template/ver2/IntroVer2'
import WorkExperienceVer2 from '@/components/resume/template/ver2/WorkExperienceVer2'
import EducationVer2 from '@/components/resume/template/ver2/EducationVer2'
import AchivementsVer2 from '@/components/resume/template/ver2/AchievementsVer2'
import CertificationsVer2 from '@/components/resume/template/ver2/CertificationsVer2'
import LanguageSkillsVer2 from '@/components/resume/template/ver2/LanguageSkillsVer2'
import URLsVer2 from '@/components/resume/template/ver2/URLsVer2'
import AuthWatcher from '@/components/auth/AuthWatcher'

export default async function ResumeVer2Page({ params }: { params: Promise<{ lang: string; resumeId: string }> }) {
  const { lang, resumeId } = await params
  const result = await fetchResumeResult(resumeId)
  const resumeData = result.data

  if (!resumeData) {
    return <Loading size={'lg'} />
  }

  return (
    <main>
      <AuthWatcher results={[result]} />

      <Header headerType={'default'} currentLng={lang} />
      <div id="resume-print-area">
        <div className="w-full">
          <IntroVer2
            memberBasicInfo={resumeData.memberBasicInfo}
            profileImageUrl={resumeData.profileImageUrl}
            introduction={resumeData.introduction}
          />
          <PageLayout>
            {resumeData.careers.length !== 0 && <WorkExperienceVer2 careers={resumeData.careers} />}
            {resumeData.educations.length !== 0 && <EducationVer2 educations={resumeData.educations} />}
            {resumeData.awards.length !== 0 && resumeData.experiences.length !== 0 ? null : (
              <AchivementsVer2 awards={resumeData.awards} experiences={resumeData.experiences} />
            )}
            {resumeData.certifications.length !== 0 && (
              <CertificationsVer2 certifications={resumeData.certifications} />
            )}
            {resumeData.languageSkills.length !== 0 && (
              <LanguageSkillsVer2 languageSkills={resumeData.languageSkills} />
            )}
            {resumeData.urls.length !== 0 && <URLsVer2 urls={resumeData.urls} />}
          </PageLayout>
        </div>
      </div>

      <Spacing height={92} />
      <BottomButton targetId="resume-print-area" />
    </main>
  )
}
