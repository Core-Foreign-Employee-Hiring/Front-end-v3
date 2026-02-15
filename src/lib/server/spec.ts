import { apiCallServer } from '@/lib/api.server'
import { ApiCallResult } from '@/types/common'
import { SpecResultType, SpecType } from '@/types/spec'

/**
 * 스펙 결과 조회
 */
export const fetchSpecResult = async (specId: string): Promise<ApiCallResult<SpecResultType>> => {
  try {
    const { data, error } = await apiCallServer(`/api/v2/member/specification/evaluation/${specId}`, {
      method: 'GET',
    })

    if (error) {
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('책 상세 정보 불러오기 실패:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * 스펙 데이터 조회
 */
export const fetchSpecData = async (): Promise<ApiCallResult<SpecType>> => {
  try {
    const { data, error } = await apiCallServer(`/api/v2/member/specification`, {
      method: 'GET',
    })

    if (error) {
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('책 상세 정보 불러오기 실패:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
