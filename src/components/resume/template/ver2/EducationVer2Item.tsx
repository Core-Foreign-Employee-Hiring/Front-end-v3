import { ResumeEducationType } from '@/types/resume'

interface EducationVer2ItemProps {
  education: ResumeEducationType | undefined
}

export default function EducationVer2Item({ education }: EducationVer2ItemProps) {
  return (
    <div className="desktop:flex-row desktop:pb-[32px] desktop:ml-[12px] border-main-500 flex flex-col gap-x-[20px] gap-y-2 border-l-[2px] pb-[24px] pl-[20px]">
      <div className="flex w-[300px] shrink-0 flex-col gap-y-2 whitespace-nowrap">
        <p className="kr-title-md">{education?.schoolName}</p>
        <p className="desktop:text-black desktop:block kr-body-sm hidden">
          {education?.admissionDate} - {education?.graduationDate}
        </p>
      </div>
      <div className="flex flex-col gap-y-2">
        <p className="kr-subtitle-lg">K-Culture학과</p>
        <p className="text-gray5 kr-body-sm desktop:hidden block">
          {education?.admissionDate} - {education?.graduationDate}
        </p>
        <p className="kr-body-md">
          {education?.earnedScore}/{education?.maxScore}
        </p>
      </div>
    </div>
  )
}
