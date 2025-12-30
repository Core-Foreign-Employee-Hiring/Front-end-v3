import { UserInfoType } from '@/types/auth'

/**
 * 저장된 유저 정보를 가져옵니다.
 */
export const getUserInfo = (): UserInfoType | null => {
  if (typeof window === 'undefined') return null // SSR(Next.js) 대응

  const data = localStorage.getItem('userInfo')
  if (!data) return null

  try {
    return JSON.parse(data)
  } catch (error) {
    console.error('유저 정보 파싱 에러:', error)
    return null
  }
}
