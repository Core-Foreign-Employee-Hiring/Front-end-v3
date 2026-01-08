import { StatIconItem } from '@/components/interview'
import { getJobContent } from '@/utils/interview'
import { InterviewStatusType, JobType } from '@/types/interview'

interface Props {
  progress: InterviewStatusType
  createdAt: string | null
  completedAt?: string | null
  job: JobType
  level: string
}

export default function HistoryItemBody({ job, completedAt, createdAt, level }: Props) {
  return (
    <section className="flex flex-col gap-y-2">
      <p className="kr-subtitle-md">{getJobContent(job)}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-3">
          <StatIconItem label={level} Icon={<div className="h-[20px] w-[20px] rounded-full bg-gray-100" />} />
        </div>
        <p className="kr-body-sm text-gray5">{completedAt ? completedAt : createdAt}</p>
      </div>
    </section>
  )
}
