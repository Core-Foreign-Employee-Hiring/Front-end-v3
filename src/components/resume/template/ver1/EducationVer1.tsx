import EducationItem from '@/components/resume/template/ver1/EducationItem'
import { ResumeEducationType } from '@/types/resume'

interface EducationVer1Props {
  educations: ResumeEducationType[] | undefined
}

export default function EducationVer1({ educations }: EducationVer1Props) {
  return (
    <div className="tablet:gap-x-[20px] desktop:gap-x-[20px] desktop:flex-row tablet:flex-row flex w-full flex-col gap-y-[20px] border-b-[2px] border-black py-[40px]">
      <div className="kr-title-md w-[200px] shrink-0 whitespace-nowrap">학력</div>
      {educations?.map((education) => (
        <EducationItem key={education.id} education={education} />
      ))}
    </div>
  )
}
