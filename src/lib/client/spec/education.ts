import { SpecEducationType } from '@/types/spec'
import { ApiCallResult } from '@/types/common'

/**
 * 교육 데이터 전송
 */
export const postSpecEducation = async (
  education: SpecEducationType | null
): Promise<ApiCallResult<ApiCallResult<void>>> => {
  try {
    const response = await fetch('/api/member/specification/education', {
      method: 'POST',
      body: JSON.stringify(education),
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
    console.log('교육 데이터', data)
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
 * 교육 데이터 수정
 */
export const putSpecEducation = async (
  educationId: string,
  education: SpecEducationType | null
): Promise<ApiCallResult<ApiCallResult<void>>> => {
  try {
    const response = await fetch(`/api/member/specification/education/${educationId}`, {
      method: 'PUT',
      body: JSON.stringify(education),
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
    console.log('교육 데이터', data)
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
 * 교육 데이터 삭제
 */
export const deleteSpecEducation = async (educationId: string): Promise<ApiCallResult<ApiCallResult<void>>> => {
  try {
    const response = await fetch('/api/member/specification/education', {
      method: 'DELETE',
      body: JSON.stringify({ ids: [educationId] }),
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
    console.log('교육 데이터', data)
    return { success: true, data }
  } catch (error) {
    console.error('Fetch 에러:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
