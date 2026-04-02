import { ApiResponse } from '@/types/common'
import { apiFetchServer } from '@/lib/api.server'
import { OrderPreviewDataType, OrderType } from '@/types/order'

/**
 * 콘텐츠 구매 주문 조회
 */
export const serverFetchOrder = async (params: { merchantOrderId: string }): Promise<ApiResponse<OrderType>> => {
  const { merchantOrderId } = params

  const response = await apiFetchServer(`/api/v2/order/${merchantOrderId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return await response.json()
}
/**
 * 주문 미리보기 조회(용범)
 */
export const serverFetchPreview = async (params: {
  passArchiveId: string
}): Promise<ApiResponse<OrderPreviewDataType>> => {
  const { passArchiveId } = params

  try {
    const response = await apiFetchServer(`/api/v2/order/preview?passArchiveId=${passArchiveId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // 1. HTTP 상태 코드가 성공(200-299)이 아닌 경우 처리
    if (!response.ok) {
      // 401 에러 등 실패 시에도 에러 객체를 반환하여 클라이언트(AuthWatcher)가 읽을 수 있게 함
      return {
        success: false,
        data: undefined,
        status: response.status, // 401 등이 담김
        message: '인증 에러 또는 서버 에러 발생',
      }
    }

    // 2. 본문이 비어있는지 확인 후 파싱 (Unexpected end of JSON 방지)
    const text = await response.text()
    if (!text) {
      return {
        data: undefined,
        message: '본문이 비어있음',
        success: false,
        status: response.status, // 401 등이 담김
      }
    }

    return JSON.parse(text)
  } catch (error) {
    // 네트워크 에러 등 아예 통신이 실패한 경우
    console.error('Fetch Preview Error:', error)
    return {
      data: undefined,
      success: false,
      status: 500,
      message: 'Network Error',
    }
  }
}
