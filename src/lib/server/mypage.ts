import { apiCallServer } from '@/lib/api.server'
import { ApiCallResult, PageNation } from '@/types/common'
import { ModifyProfileType } from '@/types/auth/modify-profile'
import { PurchaseArchiveType, SoldArchiveType, WriteArchiveType } from '@/types/mypage'

/**
 * 마이페이지 사용자 정보 불러오기
 */
export const fetchMyPageUserInfo = async (): Promise<ApiCallResult<ModifyProfileType>> => {
  try {
    const { data, error } = await apiCallServer(`/api/v2/member/my-profile`, {
      method: 'GET',
    })

    if (error) {
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('마이페이지 사용자 정보 불러오기 실패:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * 마이페이지 판매한 아카이브 조회
 */
export const fetchSoldArchiveList = async ({
  page,
  size,
}: {
  page: number
  size: number
}): Promise<ApiCallResult<PageNation<SoldArchiveType>>> => {
  try {
    const { data, error } = await apiCallServer(`/api/v2/my/sold?page=${page}&size=${size}`, {
      method: 'GET',
    })

    if (error) {
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('마이페이지 사용자 정보 불러오기 실패:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * 마이페이지 구매한 아카이브 조회
 */
export const fetchPurchasedArchiveList = async ({
  page,
  size,
}: {
  page: number
  size: number
}): Promise<ApiCallResult<PageNation<PurchaseArchiveType>>> => {
  try {
    const { data, error } = await apiCallServer(`/api/v2/my/purchased-archives?page=${page}&size=${size}`, {
      method: 'GET',
    })

    if (error) {
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('마이페이지 사용자 정보 불러오기 실패:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * 마이페이지 작성한 아카이브 조회
 */
export const fetchWriteArchiveList = async ({
  page,
  size,
}: {
  page: number
  size: number
}): Promise<ApiCallResult<PageNation<WriteArchiveType>>> => {
  try {
    const { data, error } = await apiCallServer(`/api/v2/my/archives?page=${page}&size=${size}`, {
      method: 'GET',
    })

    if (error) {
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('마이페이지 사용자 정보 불러오기 실패:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
