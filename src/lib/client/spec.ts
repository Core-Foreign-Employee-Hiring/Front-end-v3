import { SpecEvaluationType, SpecType } from '@/types/spec'
import { ApiCallResult, ApiResponse, PageNation } from '@/types/common'

/**
 * career 데이터 전송 API
 * @param spec
 */
export const postSpecData = async (spec: SpecType): Promise<ApiCallResult<ApiCallResult<void>>> => {
  try {
    const response = await fetch('/api/member/specification', {
      method: 'POST',
      body: JSON.stringify(spec),
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
    console.log('스펙 데이터', data)
    return { success: true, data }
  } catch (error) {
    console.error('Fetch 에러:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * 스펙 분석 데이터 조회
 */
export const clientFetchSpecData = async (): Promise<ApiCallResult<ApiCallResult<SpecType>>> => {
  try {
    const response = await fetch('/api/member/specification', {
      method: 'GET',
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
    console.log('스펙 데이터', data)
    return { success: true, data }
  } catch (error) {
    console.error('Fetch 에러:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * 결과 요청
 */
export const postSpecResult = async (specName: string): Promise<ApiCallResult<ApiCallResult<number>>> => {
  try {
    const response = await fetch('/api/member/specification/evaluation', {
      method: 'POST',
      body: JSON.stringify({ specName: specName }),
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
    return { success: true, data }
  } catch (error) {
    console.error('Fetch 에러:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * 스펙 평가 리스트 조회 API
 */
export const clientFetchAllSpecResult = async (params: {
  page: number
  size: number
}): Promise<ApiResponse<PageNation<SpecEvaluationType>>> => {
  const { page = 0, size = 20 } = params

  const searchParams = new URLSearchParams()
  searchParams.append('page', page.toString())
  searchParams.append('size', size.toString())

  const response = await fetch(`/api/member/specification/evaluation?${searchParams.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { revalidate: 1800 },
  })

  return await response.json()
}
