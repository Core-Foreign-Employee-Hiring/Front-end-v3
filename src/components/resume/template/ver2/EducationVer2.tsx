import { ResumeEducationType } from '@/types/resume'
import EducationVer2Item from '@/components/resume/template/ver2/EducationVer2Item'

interface EducationVer2Props {
  educations: ResumeEducationType[] | undefined
}

export default function EducationVer2({ educations }: EducationVer2Props) {
  return (
    <div className="flex flex-col gap-y-[24px] border-b-[2px] border-black py-[40px]">
      <div className="kr-title-lg">학력</div>

      {educations?.map((education) => (
        <EducationVer2Item key={education.id} education={education} />
      ))}
    </div>
  )
}
