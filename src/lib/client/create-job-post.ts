import { CreateJobPostType } from '@/types/create-job-post'
import { ApiCallResult } from '@/types/common'

/**
 * 공고 생성하기
 */
export const postRecruit = async (createJobPost: CreateJobPostType): Promise<ApiCallResult<ApiCallResult<void>>> => {
  try {
    const response = await fetch('/api/recruit', {
      method: 'POST',
      body: JSON.stringify(createJobPost),
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
