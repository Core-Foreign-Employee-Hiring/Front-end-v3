import { ResumeEducationType } from '@/types/resume'

interface EducationItemProps {
  education: ResumeEducationType | undefined
}

export default function EducationItem({ education }: EducationItemProps) {
  return (
    <div className="flex w-full flex-col items-start gap-y-2">
      <div className="desktop:flex-row tablet:flex-row tablet:justify-between desktop:justify-between desktop:items-start tablet:items-start flex w-full flex-col gap-y-2">
        <div className="flex flex-col gap-y-2">
          <p className="desktop:kr-title-md tablet:kr-title-md kr-subtitle-lg">{education?.schoolName}</p>
          <p className="desktop:kr-subtitle-lg tablet:kr-subtitle-lg kr-subtitle-md">전공명 및 학과</p>
        </div>

        <p className="desktop:kr-body-sm tablet:kr-body-sm kr-small">
          {education?.admissionDate} - {education?.graduationDate}
        </p>
      </div>

      <p className="desktop:kr-body-md tablet:kr-body-md kr-body-sm">
        {education?.earnedScore}/{education?.maxScore}
      </p>
    </div>
  )
}
