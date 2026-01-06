import { ApiCallResult, ApiResponse } from '@/types/common'

/**
 * JSON 응답을 파싱하는 헬퍼 함수
 * 백엔드 응답 형식: { code, isSuccess, message, result }
 *
 * 클라이언트 & 서버 양쪽에서 사용 가능
 */
export const parseJsonResponse = async <T = never>(
  response: Response,
  baseURL: 'BASE_URL' | 'AI_INTERVIEW_BASE_URL' = 'BASE_URL'
): Promise<ApiCallResult<T>> => {
  try {
    const rawData = await response.json()

    // 성공 응답: isSuccess = true
    if (baseURL === 'BASE_URL') {
      const data = rawData as ApiResponse<T>
      if (data.success) {
        return {
          success: true,
          data: data.data,
          status: data.status,
        }
      }
      return {
        success: false,
        status: data.status,
        error: data.message,
      }
    } else {
      const data = rawData as T
      console.log('추출:', data)
      return {
        success: true,
        data: data,
      }
    }

    // 실패 응답: isSuccess = false
  } catch (error) {
    // JSON 파싱 실패 또는 네트워크 에러
    let errorMessage = `HTTP Error: ${response.status}`

    try {
      const errorText = await response.text()
      if (errorText) {
        errorMessage = errorText
      }
    } catch {
      // response.text() 실패 시 무시
    }

    return {
      success: false,
      error: errorMessage,
    }
  }
}
