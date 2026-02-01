import { ApiCallResult } from '@/types/common'
import { RegisterType } from '@/types/auth/register'

export const getVerifyUserId = async (userId: string | undefined): Promise<ApiCallResult<undefined>> => {
  try {
    const response = await fetch(`/api/member/verify-userid?userId=${userId}`, {
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
    console.log('아이디 중복 데이터', data)
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
 * 전화번호 인증
 */
export const sendPhoneNumberCode = async (phoneNumber: string | undefined): Promise<ApiCallResult<undefined>> => {
  try {
    const response = await fetch(`/api/member/verify-phone`, {
      method: 'POST',
      body: JSON.stringify({ phoneNumber: phoneNumber }),
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
    console.log('전화번호 인증 데이터', data)
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
 * 전화번호 인증코드 인증
 */
export const postVerifyPhoneNumberCode = async (code: string): Promise<ApiCallResult<undefined>> => {
  try {
    const response = await fetch(`/api/member/verification-phone-code`, {
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
    console.log('전화번호 인증 데이터', data)
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
 * 이메일 인증번호 전송
 */
export const sendEmailCode = async (email: string | undefined): Promise<ApiCallResult<undefined>> => {
  try {
    const response = await fetch(`/api/member/verify-email`, {
      method: 'POST',
      body: JSON.stringify({ email: email }),
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
    console.log('전화번호 인증 데이터', data)
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
 * 이메일 인증코드 인증
 */
export const postVerifyEmailCode = async (code: string): Promise<ApiCallResult<undefined>> => {
  try {
    const response = await fetch(`/api/member/verification-email-code`, {
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
    console.log('전화번호 인증 데이터', data)
    return data
  } catch (error) {
    console.error('Fetch 에러:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export const postRegister = async (registerData: RegisterType): Promise<ApiCallResult<undefined>> => {
  try {
    const response = await fetch(`/api/member/register`, {
      method: 'POST',
      body: JSON.stringify(registerData),
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
    console.log('회원가입 데이터', data)
    return data
  } catch (error) {
    console.error('Fetch 에러:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
