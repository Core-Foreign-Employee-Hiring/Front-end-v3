import { SpecExperienceType } from '@/types/spec'
import { ApiCallResult } from '@/types/common'

/**
 * 커리어 생성
 */
export const postSpecExperiences = async (
  experiences: SpecExperienceType[] | null
): Promise<ApiCallResult<ApiCallResult<void>>> => {
  try {
    const response = await fetch('/api/member/specification/experience', {
      method: 'POST',
      body: JSON.stringify({ experiences: experiences }),
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
export const putSpecExperiences = async (
  experienceId: string,
  experience: SpecExperienceType
): Promise<ApiCallResult<ApiCallResult<void>>> => {
  try {
    const response = await fetch(`/api/member/specification/experience/${experienceId}`, {
      method: 'PUT',
      body: JSON.stringify(experience),
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
export const deleteSpecExperiences = async (experienceId: string): Promise<ApiCallResult<ApiCallResult<void>>> => {
  try {
    const response = await fetch('/api/member/specification/experience', {
      method: 'DELETE',
      body: JSON.stringify({ ids: [experienceId] }),
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
