'use client'

import { StatIconItem } from '@/components/interview'
import { getJobContent } from '@/utils/interview'
import { InterviewStatusType, JobType } from '@/types/interview'
import { useTranslation } from 'react-i18next'

interface Props {
  progress: InterviewStatusType
  createdAt: string | null
  completedAt?: string | null
  job: JobType
  level: string
}

export default function HistoryItemBody({ job, completedAt, createdAt, level }: Props) {
  const { t } = useTranslation('interview')
  return (
    <section className="flex flex-col gap-y-2">
      <p className="kr-subtitle-md">{getJobContent(job, t)}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-3">
          <StatIconItem label={level} />
        </div>
        <p className="kr-body-sm text-gray5">{completedAt ? completedAt : createdAt}</p>
      </div>
    </section>
  )
}
