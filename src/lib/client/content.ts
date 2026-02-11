import { ApiResponse, PageNation } from '@/types/common'
import { ReviewType } from '@/types/content'

/**
 * 공고 전체 보기
 */
export const clientFetchAllContents = async (params: {
  page: number
  size: number
  archiveId: number
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
