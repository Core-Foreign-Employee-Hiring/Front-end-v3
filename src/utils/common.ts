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
 * @param dateString - "2026-12-12" 형식의 문자열
 * @returns "~12/12(토)" 형식의 문자열
 */
export const formatToShortDateWithDay = (dateString: string | undefined): string => {
  if (!dateString) return ''
  const date = new Date(dateString)

  // 날짜가 유효하지 않을 경우 빈 문자열 반환
  if (isNaN(date.getTime())) return ''

  const month = date.getMonth() + 1 // getMonth는 0부터 시작하므로 1을 더함
  const day = date.getDate()

  // 요일 배열 (한국어)
  const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()]

  return `~${month}/${day}(${dayOfWeek})`
}

// 사용 예시
console.log(formatToShortDateWithDay('2026-12-12')) // 결과: ~12/12(토)

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
export const validateEmail = (email: string | undefined): boolean => {
  if (!email) return false
  // RFC 5322 표준에 근접한 일반적인 이메일 정규식
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  return emailRegex.test(email)
}

/**
 * @param address - "서울 성동구 성수동2가 284-55" 형식의 문자열
 * @returns "서울 성동구" 형식의 문자열
 */
export const getShortAddress = (address: string | undefined): string => {
  if (!address) return ''

  // 공백을 기준으로 문자열을 배열로 나눕니다.
  const addressParts = address.split(' ')

  // 앞의 두 요소(시/도, 구/군)가 존재할 경우 합쳐서 반환합니다.
  if (addressParts.length >= 2) {
    return `${addressParts[0]} ${addressParts[1]}`
  }

  return address // 형식이 짧을 경우 그대로 반환
}

// 사용 예시
console.log(getShortAddress('서울 성동구 성수동2가 284-55')) // 결과: 서울 성동구
console.log(getShortAddress('경기도 이천시 경충대로 2700')) // 결과: 경기도 이천시
