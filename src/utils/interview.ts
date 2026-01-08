import { JobType, LevelType } from '@/types/interview'

export const getJobContent = (job: JobType | undefined) => {
  if (!job) return ''
  switch (job) {
    case 'it':
      return 'IT'
    case 'marketing':
      return '마케팅'
  }
}
export const formatDate = (dateString?: string) => {
  if (!dateString) return null

  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}. ${month}. ${day}`
}

export const getLevelContent = (level: LevelType | undefined) => {
  if (!level) return ''
  switch (level) {
    case 'intern':
      return '인턴'
    case 'entry':
      return '신입'
    case 'experienced':
      return '경력'
  }
}
