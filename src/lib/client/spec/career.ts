import { SpecCareerType } from '@/types/spec'
import { ApiCallResult } from '@/types/common'

/**
 * 커리어 생성
 */
export const postSpecCareers = async (
  careers: SpecCareerType[] | null
): Promise<ApiCallResult<ApiCallResult<void>>> => {
  try {
    const response = await fetch('/api/member/specification/career', {
      method: 'POST',
      body: JSON.stringify({ careers: careers }),
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
    console.log('커리어 생성', data)
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
 * 커리어 수정
 */
export const putSpecCareers = async (
  careerId: string,
  career: SpecCareerType
): Promise<ApiCallResult<ApiCallResult<void>>> => {
  try {
    const response = await fetch(`/api/member/specification/career/${careerId}`, {
      method: 'PUT',
      body: JSON.stringify(career),
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
    console.log('커리어 수정', data)
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
 * 커리어 삭제
 */
export const deleteSpecCareers = async (careerId: string): Promise<ApiCallResult<ApiCallResult<void>>> => {
  try {
    const response = await fetch('/api/member/specification/career', {
      method: 'DELETE',
      body: JSON.stringify({ ids: [careerId] }),
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
    console.log('커리어 삭제', data)
    return { success: true, data }
  } catch (error) {
    console.error('Fetch 에러:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
