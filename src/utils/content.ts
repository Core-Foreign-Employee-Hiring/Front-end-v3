export function formatRelativeTime(dateString: string | undefined) {
  if (!dateString) return ''
  const now = new Date()
  const past = new Date(dateString)
  const diffInMs = now.getTime() - past.getTime()

  const diffInSeconds = Math.floor(diffInMs / 1000)
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  const diffInHours = Math.floor(diffInMinutes / 60)
  const diffInDays = Math.floor(diffInHours / 24)
  const diffInWeeks = Math.floor(diffInDays / 7)

  // 1. 1분 미만
  if (diffInMinutes < 1) return '방금 전'

  // 2. 1시간 미만 (N분 전)
  if (diffInMinutes < 60) return `${diffInMinutes}분 전`

  // 3. 24시간 미만 (N시간 전)
  if (diffInHours < 24) return `${diffInHours}시간 전`

  // 4. 1주 미만 (N일 전)
  if (diffInDays < 7) return `${diffInDays}일 전`

  // 5. 1개월 미만 (N주 전) - 보통 4주를 기준으로 잡습니다.
  if (diffInWeeks < 4) return `${diffInWeeks}주 전`

  // 6. 1개월 이후 (YY.MM.DD 형식)
  const yy = String(past.getFullYear()).slice(-2)
  const mm = String(past.getMonth() + 1).padStart(2, '0')
  const dd = String(past.getDate()).padStart(2, '0')

  return `${yy}.${mm}.${dd}`
}
