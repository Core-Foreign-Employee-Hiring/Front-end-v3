import { ResumeListType, ResumeType } from '@/types/resume'
import { apiCallServer } from '@/lib/api.server'
import { ApiCallResult, PageNation } from '@/types/common'

/**
 * 이력서 상세 조회
 */
export const fetchResumeResult = async (resumeId: string): Promise<ApiCallResult<ResumeType>> => {
  try {
    const { data, error } = await apiCallServer(`/api/v1/resumes/${resumeId}`, {
      method: 'GET',
    })

    if (error) {
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('이력서 상세 조회 불러오기 실패:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * 내 이력서 목록 조회 API
 * @param page
 * @param size
 */
export const fetchResumeList = async (
  page: number,
  size: number
): Promise<ApiCallResult<PageNation<ResumeListType>>> => {
  try {
    const { data, error } = await apiCallServer(`/api/v1/resumes?page=${page}&size=${size}`, {
      method: 'GET',
    })

    if (error) {
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('이력서 리스트 불러오기 실패:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
