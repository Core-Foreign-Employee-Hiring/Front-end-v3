import { apiCallServer } from '@/lib/api.server'
import { ApiCallResult } from '@/types/common'
import { ModifyProfileType } from '@/types/auth/modify-profile'

/**
 * 마이페이지 사용자 정보 불러오기
 */
export const fetchMyPageUserInfo = async (): Promise<ApiCallResult<ModifyProfileType>> => {
  try {
    const { data, error } = await apiCallServer(`/api/v2/member/my-profile`, {
      method: 'GET',
    })

    if (error) {
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('마이페이지 사용자 정보 불러오기 실패:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
