import { ResumeCareerType } from '@/types/resume'

interface WorkExperienceItemProps {
  career: ResumeCareerType
}
export default function WorkExperienceItem({ career }: WorkExperienceItemProps) {
  return (
    <div className="flex w-full flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="kr-title-md">{career.companyName}</p>
        <p className="kr-body-sm">
          {career.startDate} - {career.endDate}
        </p>
      </div>

      <p className="kr-subtitle-lg">
        {career.position} {career.contractType}
      </p>

      <p className="kr-body-md">{career.highlight}</p>
    </div>
  )
}
