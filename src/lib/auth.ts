import { ApiResponse } from '@/types/common'
import { EmployeeLoginType, ResponseLoginType } from '@/types/auth'

interface AuthCallResult {
  success: boolean
  status?: string
  error?: string
  name?: string
  email?: string
  userId?: string
  accessToken?: string | undefined
  refreshToken?: string | undefined
  role?: 'EMPLOYER' | 'EMPLOYEE'
}

/**
 *
 * 주의: 이 함수는 API 응답만 처리합니다.
 * 쿠키 설정은 백엔드의 Set-Cookie 헤더로 자동 처리됩니다.
 */
export const postAuth = async (loginData: EmployeeLoginType): Promise<AuthCallResult> => {
  try {
    const jwtResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/member/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
      cache: 'no-store',
    })

    if (!jwtResponse.ok) {
      const errorData = await jwtResponse.text()
      console.error('auth error:', errorData)
      throw new Error(`Failed to authenticate: ${jwtResponse.status}`)
    }

    const jwtResponseData: ApiResponse<ResponseLoginType> = await jwtResponse.json()
    // isSuccess 확인
    if (!jwtResponseData.success) {
      throw new Error(jwtResponseData.message || 'Authentication failed')
    }

    const { accessToken, refreshToken, name, userId, role, email } = jwtResponseData.data ?? {}

    return {
      success: true,
      accessToken,
      refreshToken,
      name,
      userId,
      email,
      role,
    }
  } catch (error) {
    console.error('authentication error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Authentication failed',
    }
  }
}
