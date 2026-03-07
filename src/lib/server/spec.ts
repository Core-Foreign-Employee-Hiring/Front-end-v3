import { apiCallServer, apiFetchServer } from '@/lib/api.server'
import { ApiCallResult, ApiResponse, PageNation } from '@/types/common'
import { SpecEvaluationType, SpecResultType, SpecType } from '@/types/spec'

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

/**
 * 스펙 평가 리스트 조회 API
 */
export const fetchAllSpecResult = async (params: {
  page: number
  size: number
}): Promise<ApiResponse<PageNation<SpecEvaluationType>>> => {
  const { page = 0, size = 20 } = params

  const searchParams = new URLSearchParams()
  searchParams.append('page', page.toString())
  searchParams.append('size', size.toString())

  const response = await apiFetchServer(`/api/v2/member/specification/evaluation?${searchParams.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return await response.json()
}
