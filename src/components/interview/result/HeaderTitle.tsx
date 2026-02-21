'use client'

import { StatIconItem } from '@/components/interview'
import { Badge } from '@/components/common'
import { InterviewStatusType, JobType, LevelType } from '@/types/interview'
import { formatDate, getJobContent, getLevelContent } from '@/utils/interview'
import { useTranslation } from 'react-i18next'

interface HeaderTitleProps {
  job_type: JobType | undefined
  level: LevelType | undefined
  status: InterviewStatusType | undefined
  created_at: string | undefined
  completed_at: string | undefined
  title: string | undefined
}
export default function HeaderTitle({ job_type, created_at, status, completed_at, level, title }: HeaderTitleProps) {
  const { t } = useTranslation('interview')
  return (
    <div className="desktop:gap-y-2 flex flex-col gap-y-1">
      <section className="flex items-center gap-x-2">
        <Badge
          textColor={status === 'completed' ? 'text-sub1' : 'text-main-500'}
          bgColor={status === 'completed' ? 'bg-[#00B0A933]' : 'bg-main-100'}
        >
          {status === 'completed' ? t('history.status.completed') : t('history.status.in_progress')}
        </Badge>
        <h1 className="kr-title-md">{title}</h1>
        <p className="kr-subtitle-md">{getJobContent(job_type, t)}</p>
      </section>
      <section className="flex gap-x-3">
        <StatIconItem label={completed_at ? formatDate(completed_at) : formatDate(created_at)} />
        <StatIconItem label={getLevelContent(level, t)} />
      </section>
    </div>
  )
}
