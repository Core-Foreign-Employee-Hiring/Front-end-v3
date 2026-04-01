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

  const response = await apiFetchServer(`/api/v2/order/preview?passArchiveId=${passArchiveId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return await response.json()
}
