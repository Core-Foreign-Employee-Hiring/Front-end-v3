import { ApiCallResult } from '@/types/common'
import { ModifyProfileType } from '@/types/auth/modify-profile'

export const patchModifyProfile = async (
  registerData: Partial<ModifyProfileType>
): Promise<ApiCallResult<undefined>> => {
  try {
    const response = await fetch(`/api/member/modify-profile`, {
      method: 'PATCH',
      body: JSON.stringify(registerData),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('API 응답 에러:', error)
      return { success: false, error: error.error || `HTTP ${response.status}` }
    }

    const data = await response.json()
    console.log('회원정보 데이터', data)
    return data
  } catch (error) {
    console.error('Fetch 에러:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
