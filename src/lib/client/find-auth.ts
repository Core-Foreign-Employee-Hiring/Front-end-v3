import { FindIdDataType, FindIdVerifyCodeResponseType, FindPWDataType, ModifyPWDataType } from '@/types/auth/find-auth'
import { ApiCallResult } from '@/types/common'

export const postFindId = async (findIdData: FindIdDataType): Promise<ApiCallResult<undefined>> => {
  try {
    const response = await fetch(`/api/member/find-id/send-code`, {
      method: 'POST',
      body: JSON.stringify(findIdData),
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
    console.log('아이디 찾기 데이터', data)
    return data
  } catch (error) {
    console.error('Fetch 에러:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export const postFindIdVerifyCode = async (
  code: string | undefined
): Promise<ApiCallResult<FindIdVerifyCodeResponseType>> => {
  try {
    const response = await fetch(`/api/member/find-id/verify-code`, {
      method: 'POST',
      body: JSON.stringify({ code: code }),
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
    console.log('아이디 찾기 데이터', data)
    return data
  } catch (error) {
    console.error('Fetch 에러:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export const postFindPW = async (findPWData: FindPWDataType): Promise<ApiCallResult<undefined>> => {
  try {
    const response = await fetch(`/api/member/password-reset/send-code`, {
      method: 'POST',
      body: JSON.stringify(findPWData),
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
    console.log('아이디 찾기 데이터', data)
    return data
  } catch (error) {
    console.error('Fetch 에러:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export const postFindPWVerifyCode = async (
  code: string | undefined
): Promise<ApiCallResult<FindIdVerifyCodeResponseType>> => {
  try {
    const response = await fetch(`/api/member/password-reset/verify-code`, {
      method: 'POST',
      body: JSON.stringify({ code: code }),
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
    console.log('아이디 찾기 데이터', data)
    return data
  } catch (error) {
    console.error('Fetch 에러:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * 새 비밀번호 설정
 */
export const modifyPW = async (modifyPWData: ModifyPWDataType): Promise<ApiCallResult<void>> => {
  try {
    const response = await fetch(`/api/member/password-reset/modify`, {
      method: 'PATCH',
      body: JSON.stringify(modifyPWData),
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
    console.log('새로운 비밀번호 설정 데이터', data)
    return data
  } catch (error) {
    console.error('Fetch 에러:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
