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

/**
 * URL에서 파일명만 추출합니다.
 */
export const getFileNameFromUrl = (url: string): string => {
  try {
    const decodedUrl = decodeURIComponent(url) // 한글 파일명 대응
    const fileName = decodedUrl.split('/').pop()?.split('?')[0] // 쿼리스트링 제거
    return fileName || 'unknown_file'
  } catch {
    return 'unknown_file'
  }
}

/**
 * 파일 크기(bytes)를 읽기 좋은 단위(KB, MB 등)로 변환합니다.
 */
export const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

/**
 * URL을 통해 실제 파일의 크기를 가져옵니다. (CORS 허용 필요)
 */
export const getFileSizeFromUrl = async (url: string): Promise<string> => {
  try {
    const response = await fetch(url, { method: 'HEAD' })
    const size = response.headers.get('content-length')
    return size ? formatBytes(parseInt(size)) : 'Unknown Size'
  } catch (error) {
    console.error('파일 크기를 가져오는데 실패했습니다:', error)
    return 'Unknown Size'
  }
}
