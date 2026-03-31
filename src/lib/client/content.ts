import { ApiCallResult, ApiResponse, PageNation } from '@/types/common'
import { ReviewType } from '@/types/content'
import { PaymentConfirmType } from '@/types/order'

/**
 * 공고 전체 보기
 */
export const clientFetchAllContents = async (params: {
  page: number
  size: number
  archiveId: string
}): Promise<ApiResponse<PageNation<ReviewType>>> => {
  const { page = 0, size = 20, archiveId } = params

  const searchParams = new URLSearchParams()
  searchParams.append('page', page.toString())
  searchParams.append('size', size.toString())

  const response = await fetch(`/api/pass-archives/${archiveId}/reviews?${searchParams.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { revalidate: 1800 },
  })

  return await response.json()
}

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

/**
 * 문의하기 링크 조회
 */
export const getInquiryUrl = async (archiveId: string): Promise<string> => {
  const response = await fetch(`/api/pass-archives/${archiveId}/inquiry-url`, {
    method: 'GET',
  })

  if (!response.ok) throw new Error('Upload failed')

  const result = await response.json()
  return result.data
}

/**
 * 합격 아카이브 등록 (태근) - FormData 버전
 */
export const createContentAPI = async (formData: FormData): Promise<ApiCallResult<void>> => {
  try {
    const response = await fetch('/api/pass-archives', {
      method: 'POST',
      body: formData, // FormData를 그대로 전달
      credentials: 'include',
    })

    if (!response.ok) {
      const error = await response.json()
      return { success: false, error: error.error || `HTTP ${response.status}` }
    }

    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
