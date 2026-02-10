import WorkExperienceVer2Item from '@/components/resume/template/ver2/WorkExperienceVer2Item'
import { ResumeCareerType } from '@/types/resume'

interface WorkExperienceVer2Props {
  careers: ResumeCareerType[] | undefined
}

export default function WorkExperienceVer2({ careers }: WorkExperienceVer2Props) {
  return (
    <div className="flex flex-col gap-y-[24px] border-b-[2px] border-black py-[40px]">
      <div className="kr-title-lg">업무 경험</div>

      {careers?.map((career) => (
        <WorkExperienceVer2Item key={career.id} career={career} />
      ))}
    </div>
  )
}
