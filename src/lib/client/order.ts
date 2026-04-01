import { ApiCallResult } from '@/types/common'
import { CashReceiptDataType, OrderType } from '@/types/order'

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

/**
 * 현금영수증 조회(용범)
 */
export const getCashReceipt = async (
  merchantOrderId: string
): Promise<
  ApiCallResult<
    ApiCallResult<{
      receiptUrl: string
    }>
  >
> => {
  try {
    const response = await fetch(`/api/order/${merchantOrderId}/cash-receipt`, {
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
    console.log('영수증 데이터', data)
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
 * 현금 영수증 조회(용범)
 */
export const postCashReceipt = async (
  merchantOrderId: string,
  cashReceiptData: CashReceiptDataType
): Promise<ApiCallResult<ApiCallResult<void>>> => {
  try {
    const response = await fetch(`/api/order/${merchantOrderId}/cash-receipt`, {
      method: 'POST',
      body: JSON.stringify(cashReceiptData),
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
    console.log('영수증 생성 데이터', data)
    return { success: true, data }
  } catch (error) {
    console.error('Fetch 에러:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
