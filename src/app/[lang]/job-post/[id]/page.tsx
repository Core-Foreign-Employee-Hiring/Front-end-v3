import JobPostSummary from '@/components/job-post/JobPostSummary'
import JobDetail from '@/components/job-post/JobDetail'
import WorkplaceInfo from '@/components/job-post/WorkplaceInfo'
import CompanyInfo from '@/components/job-post/CompanyInfo'
import WorkConditions from '@/components/job-post/WorkConditions'
import ActionButtons from '@/components/job-post/ActionButtons'
import { fetchJobPostDetail } from '@/lib/server/job-post'
import TranslationsProvider from '@/providers/TranslationsProvider'
import initTranslations from '@/i18n/i18n'
import Loading from '@/components/common/Loading'
import BottomBorder from '@/components/common/BottomBorder'
import MobileWorkConditions from '@/components/job-post/MobileWorkConditions'
import BottomActionsButtons from '@/components/job-post/BottomActionButtons'
import AuthWatcher from '@/components/auth/AuthWatcher'

const namespaces = ['jobPost', 'common', 'filter', 'modal']

export default async function JobPostDetail({
  params,
}: Readonly<{
  params: Promise<{ lang: string; id: number }>
}>) {
  const { lang, id } = await params

  const result = await fetchJobPostDetail(id)
  const jobPost = result.data

  const { resources } = await initTranslations(lang, namespaces)

  if (!jobPost) {
    return <Loading />
  }

  return (
    <TranslationsProvider locale={lang} namespaces={namespaces} resources={resources}>
      <AuthWatcher results={[result]} />

      <main className="flex w-full justify-between gap-x-[64px]">
        <div className="flex w-full flex-col gap-y-[24px]">
          <JobPostSummary
            isAlwaysRecruiting={jobPost.isAlwaysRecruiting}
            carrerType={jobPost.carrerType}
            directInputCarrerType={jobPost.directInputCarrerType}
            workZipcode={jobPost.workZipcode}
            contractType={jobPost.contractType}
            JobCategoryTypes={jobPost.jobCategories}
            title={jobPost.title}
            jobRoles={jobPost.jobRoles}
            companyName={jobPost.companyName}
            workAddress1={jobPost.workAddress1}
            workAddress2={jobPost.workAddress2}
            companyImageUrl={jobPost.companyImageUrl}
            languageTypes={jobPost.languageTypes}
            recruitEndDate={jobPost.recruitEndDate}
            visas={jobPost.visas}
          />
          <MobileWorkConditions
            workType={jobPost.workType}
            directInputWorkType={jobPost.directInputWorkType}
            workStartTime={jobPost.workStartTime}
            workEndTime={jobPost.workEndTime}
            directInputWorkTime={jobPost.directInputWorkTime}
            workDayPatternType={jobPost.workDayPatternType}
            workingDays={jobPost.workingDays}
            directInputWorkDayType={jobPost.directInputWorkDayType}
            salaryType={jobPost.salaryType}
            directInputSalaryType={jobPost.directInputSalaryType}
            salary={jobPost.salary}
          />
          <JobDetail
            submissionDocuments={jobPost.submissionDocuments}
            posterImageUrl={jobPost.posterImageUrl}
            applicationMethod={jobPost.applicationMethod}
            mainTasks={jobPost.mainTasks}
            others={jobPost.others}
            preferences={jobPost.preferences}
            qualifications={jobPost.qualifications}
          />
          <BottomBorder height={6} color={'gray1'} />
          {!(jobPost.workAddress1 && jobPost.workZipcode) ? null : (
            <>
              <WorkplaceInfo
                address2={jobPost.workAddress2}
                address1={jobPost.workAddress1}
                zipcode={jobPost.workZipcode}
              />
              <BottomBorder height={6} color={'gray1'} />
            </>
          )}
          <CompanyInfo
            websiteUrl={jobPost.websiteUrl}
            companyAddress1={jobPost.companyAddress1}
            companyAddress2={jobPost.companyAddress2}
            companyIntroduction={jobPost.companyIntroduction}
            companyZipcode={jobPost.companyZipcode}
            companyImageUrl={jobPost.companyImageUrl}
            companyName={jobPost.companyName}
            representativeName={jobPost.representativeName}
            companyType={jobPost.companyType}
            businessType={jobPost.businessType}
            establishedDate={jobPost.establishedDate}
          />
        </div>
        <div className="desktop:flex desktop:w-[384px] hidden w-full shrink-0 flex-col gap-y-[20px]">
          <WorkConditions
            directInputSalaryType={jobPost.directInputSalaryType}
            directInputWorkDayType={jobPost.directInputWorkDayType}
            directInputWorkTime={jobPost.directInputWorkTime}
            directInputWorkType={jobPost.directInputWorkType}
            workEndTime={jobPost.workEndTime}
            salaryType={jobPost.salaryType}
            salary={jobPost.salary}
            workDayPatternType={jobPost.workDayPatternType}
            workingDays={jobPost.workingDays}
            workStartTime={jobPost.workStartTime}
            workType={jobPost.workType}
          />
          <ActionButtons
            applicationMethod={jobPost.applicationMethod}
            directInputApplicationMethod={jobPost.directInputApplicationMethod}
          />
        </div>
      </main>
      <BottomActionsButtons
        applicationMethod={jobPost.applicationMethod}
        directInputApplicationMethod={jobPost.directInputApplicationMethod}
      />
    </TranslationsProvider>
  )
}
