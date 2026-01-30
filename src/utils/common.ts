/**
 * ISO 날짜 문자열을 'YYYY. MM. DD' 형식으로 변환합니다.
 * @param dateString - "2026-01-29T16:55:19.435571"와 같은 날짜 문자열
 */
export const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return ''

  const date = new Date(dateString)

  // 유효하지 않은 날짜인 경우 빈 문자열 반환
  if (isNaN(date.getTime())) return ''

  const year = date.getFullYear()
  // 월과 일은 항상 두 자리로 맞추기 위해 padStart 사용
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}. ${month}. ${day}`
}

/**
 * 휴대폰 전화 추출
 * @param value
 */
export const formatPhoneNumber = (value: string) => {
  // 숫자만 추출
  const numbers = value.replace(/[^\d]/g, '')

  // 길이에 따라 포맷팅
  if (numbers.length <= 3) {
    return numbers
  } else if (numbers.length <= 7) {
    return `${numbers.slice(0, 3)}-${numbers.slice(3)}`
  } else if (numbers.length <= 11) {
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`
  } else {
    // 11자리 초과시 11자리까지만
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`
  }
}

/**
 * 이메일 형식이 유효한지 검사합니다.
 * @param email - 검사할 이메일 문자열
 * @returns 유효하면 true, 아니면 false
 */
export const validateEmail = (email: string): boolean => {
  // RFC 5322 표준에 근접한 일반적인 이메일 정규식
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  return emailRegex.test(email)
}
