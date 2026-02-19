import { TFunction } from 'i18next'

export function formatRelativeTime(dateString: string | undefined, t: TFunction) {
  if (!dateString) return ''
  const now = new Date()
  const past = new Date(dateString)
  const diffInMs = now.getTime() - past.getTime()

  if (isNaN(past.getTime())) return ''

  const diffInSeconds = Math.floor(diffInMs / 1000)
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  const diffInHours = Math.floor(diffInMinutes / 60)
  const diffInDays = Math.floor(diffInHours / 24)
  const diffInWeeks = Math.floor(diffInDays / 7)

  // 1. 1분 미만
  if (diffInMinutes < 1) return t('content:detail.contentReview.relativeTime.justNow')

  // 2. 1시간 미만
  if (diffInMinutes < 60) return t('content:detail.contentReview.relativeTime.minutes', { count: diffInMinutes })

  // 3. 24시간 미만
  if (diffInHours < 24) return t('content:detail.contentReview.relativeTime.hours', { count: diffInHours })

  // 4. 1주 미만
  if (diffInDays < 7) return t('content:detail.contentReview.relativeTime.days', { count: diffInDays })

  // 5. 1개월 미만
  if (diffInWeeks < 4) return t('content:detail.contentReview.relativeTime.weeks', { count: diffInWeeks })

  // 6. 그 외 (날짜 포맷팅)
  const yy = String(past.getFullYear()).slice(-2)
  const mm = String(past.getMonth() + 1).padStart(2, '0')
  const dd = String(past.getDate()).padStart(2, '0')

  return `${yy}.${mm}.${dd}`
}
