import { ResumeEducationType } from '@/types/resume'

interface EducationItemProps {
  education: ResumeEducationType | undefined
}

export default function EducationItem({ education }: EducationItemProps) {
  return (
    <div className="flex w-full flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="kr-title-md">{education?.schoolName}</p>
        <p className="kr-body-sm">
          {education?.admissionDate} - {education?.graduationDate}
        </p>
      </div>

      {/*<p className="kr-subtitle-lg">{education.}</p>*/}

      <p className="kr-body-md">
        {education?.earnedScore}/{education?.maxScore}
      </p>
    </div>
  )
}
