import WorkExperienceItem from '@/components/resume/template/ver1/WorkExperienceItem'
import { ResumeCareerType } from '@/types/resume'

interface WorkExperienceVer1Props {
  careers: ResumeCareerType[] | undefined
}

export default function WorkExperienceVer1({ careers }: WorkExperienceVer1Props) {
  return (
    <div className="flex w-full gap-x-[20px] border-b-[2px] border-black py-[40px]">
      <div className="kr-title-md w-[200px] shrink-0 whitespace-nowrap">업무 경험</div>
      {careers?.map((career) => (
        <WorkExperienceItem key={career.id} career={career} />
      ))}
    </div>
  )
}
