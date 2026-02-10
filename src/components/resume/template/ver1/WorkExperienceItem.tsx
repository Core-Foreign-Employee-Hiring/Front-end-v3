import { ResumeCareerType } from '@/types/resume'

interface WorkExperienceItemProps {
  career: ResumeCareerType
}
export default function WorkExperienceItem({ career }: WorkExperienceItemProps) {
  return (
    <div className="flex w-full flex-col items-start gap-y-2">
      <div className="tablet:justify-between desktop:justify-between desktop:flex-row tablet:flex-row flex flex-col items-start gap-y-2">
        <div className="flex flex-col gap-y-2">
          <p className="desktop:kr-title-md tablet:kr-title-md kr-subtitle-lg">{career.companyName}</p>
          <p className="desktop:kr-subtitle-lg tablet:kr-subtitle-lg kr-subtitle-md">
            {career.position} {career.contractType}
          </p>
        </div>
        <p className="tablet:kr-body-sm desktop:kr-body-sm kr-small text-gray5">
          {career.startDate} - {career.endDate}
        </p>
      </div>

      <p className="desktop:kr-body-md tablet:kr-body-md kr-body-sm">{career.highlight}</p>
    </div>
  )
}
