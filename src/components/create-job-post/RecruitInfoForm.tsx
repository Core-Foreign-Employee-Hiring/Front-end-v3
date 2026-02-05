import Title from '@/components/create-job-post/recruit-info/Title'
import RecruitDate from '@/components/create-job-post/recruit-info/recruitDate'
import JobRole from '@/components/create-job-post/recruit-info/JobRole'
import ContractType from '@/components/create-job-post/recruit-info/ContractType'
import Career from '@/components/create-job-post/recruit-info/Career'
import WorkDayType from '@/components/create-job-post/recruit-info/WorkDayType'
import Salary from '@/components/create-job-post/recruit-info/Salary'

export default function RecruitInfoForm() {
  return (
    <div className="">
      <Title />
      <RecruitDate />
      <JobRole />
      <Career />
      <ContractType />
      <WorkDayType />
      <Salary />
    </div>
  )
}
