import WorkExperienceItem from '@/components/resume/template/ver1/WorkExperienceItem'
import { ResumeCareerType } from '@/types/resume'

interface WorkExperienceVer1Props {
  careers: ResumeCareerType[] | undefined
}

export default function WorkExperienceVer1({ careers }: WorkExperienceVer1Props) {
  return (
    <div className="tablet:gap-x-[20px] desktop:gap-x-[20px] desktop:flex-row tablet:flex-row flex w-full flex-col gap-y-[20px] border-b-[2px] border-black py-[40px]">
      <div className="kr-title-md w-[200px] shrink-0 whitespace-nowrap">업무 경험</div>
      {careers?.map((career) => (
        <WorkExperienceItem key={career.id} career={career} />
      ))}
    </div>
  )
}
