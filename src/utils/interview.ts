import { JobType, LevelType } from '@/types/interview'
import { TFunction } from 'i18next'

export const getJobContent = (job: JobType | undefined, t: TFunction) => {
  if (!job) return ''
  return t(`interview:history.options.job.${job}`)
}

export const getLevelContent = (level: LevelType | undefined, t: TFunction) => {
  if (!level) return ''
  return t(`interview:history.options.level.${level}`)
}

export const formatDate = (dateString?: string) => {
  if (!dateString) return null

  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}. ${month}. ${day}`
}
