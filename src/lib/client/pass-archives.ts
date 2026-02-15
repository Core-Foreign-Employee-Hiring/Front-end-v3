import { ApiCallResult } from '@/types/common'
import { ReviewDetailType, ReviewType } from '@/types/review'

/**
 * 합격 아카이브 다운로드
 */
export const getPassArchivesDownLoad = async (archiveId: number) => {
  const response = await fetch(`/api/pass-archives/${archiveId}/download`, {
    method: 'GET',
  })

  if (!response.ok) throw new Error('Upload failed')

  const result = await response.json()
  return result.data
}

/**
 * 합격 아카이브 리뷰 작성
 */
export const postReview = async (
  archiveId: number,
  reviewData: ReviewType
): Promise<ApiCallResult<ApiCallResult<void>>> => {
  try {
    const response = await fetch(`/api/pass-archives/${archiveId}/reviews`, {
      method: 'POST',
      body: JSON.stringify(reviewData),
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
    console.log('리뷰 데이터', data)
    return { success: true, data }
  } catch (error) {
    console.error('Fetch 에러:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export const getReviewDetail = async (reviewId: number): Promise<ApiCallResult<ReviewDetailType>> => {
  try {
    const response = await fetch(`/api/pass-archives/reviews/${reviewId}`, {
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
    console.log('리뷰 상세 데이터', data)
    return data
  } catch (error) {
    console.error('Fetch 에러:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
