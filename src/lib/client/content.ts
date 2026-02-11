import { ApiResponse, PageNation } from '@/types/common'
import { ReviewType } from '@/types/content'

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
 * 콘텐츠 결제
 */
export const postPaymentContent = async (archiveId: string): Promise<void> => {
  const searchParams = new URLSearchParams()
  searchParams.append('archiveId', archiveId.toString())
  const response = await fetch(`/api/payment/test/confirm?${searchParams.toString()}`, {
    method: 'POST',
  })

  if (!response.ok) throw new Error('Upload failed')

  const result = await response.json()
  return result.data
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
