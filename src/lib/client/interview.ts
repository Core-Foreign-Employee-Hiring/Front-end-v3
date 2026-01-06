import { ApiCallResult } from '@/types/common'
import {
  CommonAnswerType,
  FollowUpAnswerType,
  FollowUpQuestionType,
  InterviewQuestionType,
  InterviewSettingOptionType,
} from '@/types/interview'

/**
 * AI 면접 테스트 생성
 * @param settingInterviewOption 면접 시작시 선택 옵션
 */
export const postInterviewData = async (
  settingInterviewOption: InterviewSettingOptionType
): Promise<ApiCallResult<ApiCallResult<InterviewQuestionType>>> => {
  try {
    const response = await fetch('/api/interview/sets', {
      method: 'POST',
      body: JSON.stringify(settingInterviewOption),
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
    console.log('인터뷰 데이터', data)
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
 * 답변 전송
 * @param answer 질문에 대한 답변
 */
export const postAnswer = async (
  answer: CommonAnswerType
): Promise<ApiCallResult<ApiCallResult<FollowUpQuestionType>>> => {
  try {
    const response = await fetch('/api/interview/answers', {
      method: 'POST',
      body: JSON.stringify(answer),
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
    console.log('답변 데이터', data)
    return { success: true, data }
  } catch (error) {
    console.error('Fetch 에러:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export const postFollowUpAnswer = async (followUpAnswer: FollowUpAnswerType) => {
  try {
    const response = await fetch('/api/interview/follow-up-answers', {
      method: 'POST',
      body: JSON.stringify(followUpAnswer),
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
    console.log('답변 데이터', data)
    return { success: true, data }
  } catch (error) {
    console.error('Fetch 에러:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
export const postInterviewResult = async (setId: string) => {
  try {
    const response = await fetch(`/api/interview/sets/${setId}/complete`, {
      method: 'POST',
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
    console.log('답변 데이터', data)
    return { success: true, data }
  } catch (error) {
    console.error('Fetch 에러:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
