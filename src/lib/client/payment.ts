import { PaymentConfirmType } from '@/types/order'
import { ApiCallResult } from '@/types/common'

/**
 * 결제 승인 요청 API (용범)
 */
export const postPaymentContent = async (
  paymentConfirmData: PaymentConfirmType
): Promise<ApiCallResult<ApiCallResult<PaymentConfirmType>>> => {
  try {
    const response = await fetch(`/api/payment/confirm`, {
      method: 'POST',
      body: JSON.stringify(paymentConfirmData),
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
    console.log('결제 승인 요청 데이터', data)
    return { success: true, data }
  } catch (error) {
    console.error('Fetch 에러:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
