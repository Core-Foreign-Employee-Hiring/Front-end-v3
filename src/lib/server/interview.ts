import { ApiCallResult } from '@/types/common'
import { apiCallServer } from '@/lib/api.server'
import { InterviewResultType, InterviewSetType } from '@/types/interview'

/**
 * 면접 완료 및 평가 생성
 */
export const fetchInterviewSets = async (): Promise<ApiCallResult<InterviewSetType[]>> => {
  try {
    const { data, error } = await apiCallServer<InterviewSetType[]>(
      '/interview/sets',
      {
        method: 'GET',
      },
      'AI_INTERVIEW_BASE_URL'
    )

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
 * 면접 세트 조회
 * @param setId 면접 세트 UUID
 */
export const fetchInterviewResult = async (setId: string): Promise<ApiCallResult<InterviewResultType>> => {
  try {
    const { data, error } = await apiCallServer<InterviewResultType>(
      `/interview/sets/${setId}`,
      {
        method: 'GET',
      },
      'AI_INTERVIEW_BASE_URL'
    )

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
