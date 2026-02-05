import Title from '@/components/create-job-post/recruit-info/Title'
import RecruitDate from '@/components/create-job-post/recruit-info/RecruitDate'
import JobRole from '@/components/create-job-post/recruit-info/JobRole'
import ContractType from '@/components/create-job-post/recruit-info/ContractType'
import Career from '@/components/create-job-post/recruit-info/Career'
import WorkDayType from '@/components/create-job-post/recruit-info/WorkDayType'
import Salary from '@/components/create-job-post/recruit-info/Salary'
import WorkTime from '@/components/create-job-post/recruit-info/WorkTime'

export default function RecruitInfoForm() {
  return (
    <div className="flex flex-col gap-y-[32px]">
      <Title />
      <RecruitDate />
      <JobRole />
      <Career />
      <ContractType />
      <WorkDayType />
      <WorkTime />
      <Salary />
    </div>
  )
}
