import { ApiCallResult, ErrorDetailType } from '@/types/common'
import { apiCallServer } from '@/lib/api.server'
import { InterviewResultType, InterviewSetType } from '@/types/interview'
import { AnswerNoteType, ResponseCreateNewNoteType } from '@/types/interview/note'

/**
 * 면접 노트
 */
export const fetchInterviewAnswerNotes = async (): Promise<ApiCallResult<AnswerNoteType[] | ErrorDetailType>> => {
  try {
    // T | ErrorDetail 형태로 타입을 확장하여 받아옵니다.
    const { data, error, status } = await apiCallServer<AnswerNoteType[] | ErrorDetailType>(
      '/answer-notes',
      { method: 'GET' },
      'AI_INTERVIEW_BASE_URL'
    )

    if (error) return { success: false, error, status }

    // 💡 타입 가드: data가 에러 객체(ErrorDetail)인 경우 처리
    if (data && !Array.isArray(data) && 'detail' in data) {
      return {
        success: false,
        error: data.detail,
        status: status || 401,
        data: data,
      }
    }

    return {
      success: true,
      data: data as AnswerNoteType[],
      status,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * 면접 완료 및 평가 생성
 */
export const fetchInterviewSets = async (): Promise<ApiCallResult<InterviewSetType[] | ErrorDetailType>> => {
  try {
    // any 대신 Union 타입을 사용하여 데이터를 받아옵니다.

    const { data, error, status } = await apiCallServer<InterviewSetType[] | ErrorDetailType>(
      '/interview/sets',
      { method: 'GET' },
      'AI_INTERVIEW_BASE_URL'
    )

    if (error) return { success: false, error, status }

    // 💡 타입 가드: data가 존재하고, 배열이 아니며, detail 필드가 있다면 에러로 처리
    if (data && !Array.isArray(data) && 'detail' in data) {
      return {
        success: false,
        error: data.detail,
        status: status || 401,
        data: data, // AuthWatcher가 확인할 수 있게 넘겨줌
      }
    }

    return {
      success: true,
      data: data as InterviewSetType[], // 위에서 걸러졌으므로 여기선 배열임이 확실함
      status,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
/**
 * 면접 세트 조회 (단일 객체 반환 건)
 */
export const fetchInterviewResult = async (
  setId: string
): Promise<ApiCallResult<InterviewResultType | ErrorDetailType>> => {
  try {
    const { data, error, status } = await apiCallServer<InterviewResultType | ErrorDetailType>(
      `/interview/sets/${setId}`,
      { method: 'GET' },
      'AI_INTERVIEW_BASE_URL'
    )

    if (error) return { success: false, error, status }

    // 💡 타입 가드: InterviewResultType과 ErrorDetail 구분
    // InterviewResultType에 없는 'detail' 속성이 있는지 확인합니다.
    if (data && 'detail' in data) {
      return {
        success: false,
        error: data.detail,
        status: status || 401,
        data: data,
      }
    }

    return {
      success: true,
      data: data as InterviewResultType,
      status,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
/**
 * 면접 노트 상세 조회
 */
export const fetchInterviewAnswerNoteDetail = async (
  noteId: string
): Promise<ApiCallResult<ResponseCreateNewNoteType | ErrorDetailType>> => {
  try {
    const { data, error, status } = await apiCallServer<ResponseCreateNewNoteType | ErrorDetailType>(
      `/answer-notes/${noteId}`,
      { method: 'GET' },
      'AI_INTERVIEW_BASE_URL'
    )

    if (error) return { success: false, error, status }

    if (data && 'detail' in data) {
      return {
        success: false,
        error: data.detail,
        status: status || 401,
        data: data,
      }
    }

    return {
      success: true,
      data: data as ResponseCreateNewNoteType,
      status,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
