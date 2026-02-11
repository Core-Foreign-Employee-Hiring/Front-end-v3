import { ApiResponse, PageNation } from '@/types/common'
import { apiFetchServer } from '@/lib/api.server'
import { ContentDetailType, ContentType } from '@/types/content'

/**
 * 콘텐츠 전체 보기
 */
export const serverFetchAllContentPosts = async (params: {
  page: number
  size: number
  keyword?: string
}): Promise<ApiResponse<PageNation<ContentType>>> => {
  const { page = 0, size = 20, keyword } = params

  const searchParams = new URLSearchParams()
  searchParams.append('page', page.toString())
  searchParams.append('size', size.toString())

  if (keyword) {
    searchParams.append('keyword', keyword)
  }

  const response = await apiFetchServer(`/api/v1/pass-archives?${searchParams.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return await response.json()
}

/**
 * 콘텐츠 상세 보기
 */
export const serverFetchContentDetail = async (id: string): Promise<ApiResponse<ContentDetailType>> => {
  const searchParams = new URLSearchParams()
  searchParams.append('id', id.toString())

  const response = await apiFetchServer(`/api/v1/pass-archives/detail?${searchParams.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return await response.json()
}
