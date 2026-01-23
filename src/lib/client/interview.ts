import { ApiCallResult } from '@/types/common'
import {
  CommonAnswerType,
  FollowUpAnswerType,
  FollowUpQuestionType,
  InterviewQuestionType,
  InterviewResultType,
  InterviewSettingOptionType,
} from '@/types/interview'
import { AnswerEntryType, AnswerNoteType, CreateNoteDataType, ResponseCreateNewNoteType } from '@/types/interview/note'

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
export const postCommonAnswer = async (
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

/**
 * 면접 세트 조회
 * @param setId 면접 세트 UUID
 */
export const fetchClientInterviewResult = async (
  setId: string
): Promise<ApiCallResult<ApiCallResult<InterviewResultType>>> => {
  try {
    const response = await fetch(`/api/interview/sets/${setId}`, {
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
    console.log('결과 디테일 데이터', data)
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
 * 답변 노트 조회
 */
export const fetchClientAnswerNotes = async (): Promise<ApiCallResult<ApiCallResult<AnswerNoteType[]>>> => {
  try {
    const response = await fetch(`/api/answer-notes`, {
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
    console.log('면접 노트 데이터', data)
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
 * 답변 노트 생성
 */
export const postCreateNote = async (
  createNoteData: CreateNoteDataType
): Promise<ApiCallResult<ApiCallResult<ResponseCreateNewNoteType>>> => {
  try {
    const response = await fetch(`/api/answer-notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createNoteData),
      credentials: 'include',
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('API 응답 에러:', error)
      return { success: false, error: error.error || `HTTP ${response.status}` }
    }

    const data = await response.json()
    console.log('면접 노트 데이터', data)
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
 * 기존 노트에 답변 노트 항목 추가
 */
export const postAnswerEntry = async (noteId: string, answerEntry: AnswerEntryType) => {
  try {
    const response = await fetch(`/api/answer-notes/${noteId}/entries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(answerEntry),
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

/**
 * 기존 노트에 답변 노트 항목 수정
 */
export const putNoteEntry = async (
  noteId: string | undefined,
  entryId: string | undefined,
  answerEntry: Partial<AnswerEntryType>
) => {
  try {
    const response = await fetch(`/api/answer-notes/${noteId}/entries/${entryId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(answerEntry),
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

/**
 * 기존 노트에 답변 노트 항목 수정
 */
export const putNoteTitle = async (noteId: string | undefined, title: string) => {
  try {
    const response = await fetch(`/api/answer-notes/${noteId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: title }),
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

/**
 * 기존 노트에 답변 노트 항목 삭제
 */
export const deleteNote = async (noteId: string | undefined) => {
  try {
    const response = await fetch(`/api/answer-notes/${noteId}`, {
      method: 'DELETE',
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
