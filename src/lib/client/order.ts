import { ApiCallResult } from '@/types/common'
import { OrderType } from '@/types/order'

/**
 * 주문 생성
 */
export const postOrder = async (passArchiveIds: number[]): Promise<ApiCallResult<ApiCallResult<OrderType>>> => {
  try {
    const response = await fetch(`/api/order`, {
      method: 'POST',
      body: JSON.stringify({ passArchiveIds: passArchiveIds }),
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
    console.log('주문 생성 데이터', data)
    return { success: true, data }
  } catch (error) {
    console.error('Fetch 에러:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
