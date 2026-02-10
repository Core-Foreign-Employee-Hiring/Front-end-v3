import { cookies } from 'next/headers'
import { useModalStore } from '@/store/modalStore'

export const getAccessTokenServer = async (): Promise<string | null> => {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('accessToken')?.value

    if (accessToken) {
      console.log('✅ AccessToken found in server cookies')
    }

    return accessToken || null
  } catch (error) {
    console.error('Error reading accessToken from cookies:', error)
    return null
  }
}

export const getRefreshTokenServer = async (): Promise<string | null> => {
  try {
    const cookieStore = await cookies()
    const refreshToken = cookieStore.get('refreshToken')?.value

    if (refreshToken) {
      console.log('✅ RefreshToken found in server cookies')
    }

    return refreshToken || null
  } catch (error) {
    console.error('Error reading refreshToken from cookies:', error)
    return null
  }
}

/**
 * 토큰 갱신 + 쿠키 업데이트 (Route Handler 사용)
 */
export const refreshAccessTokenServer = async () => {
  try {
    const refreshToken = await getRefreshTokenServer()

    if (!refreshToken) {
      //token 만료 modal
      // useModalStore.getState().setState({ isTokenExpiredModalOpen: true })
      return { success: false, error: 'No refresh token' }
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/member/token-reissue`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization-Refresh': `Bearer ${refreshToken}`,
      },
    })

    console.log('😡response', response)

    if (!response.ok) {
      //token 만료 modal
      useModalStore.getState().setIsRequiredLoginModalOpen(true)
      // 쿠키 삭제 - Route Handler 호출
      await fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth/cookies`, {
        method: 'DELETE',
      })
      return { success: false, error: 'Token refresh failed' }
    }

    const accessToken = response.headers.get('authorization')?.replace('Bearer ', '')
    console.log('😊accessToken', response.headers.get('authorization'))
    console.log('😊refreshToken', response.headers.get('authorization-refresh'))

    for (const [key, value] of response.headers.entries()) {
      console.log(`${key}: ${value}`)
    }

    // 쿠키 설정 - Route Handler 호출
    await fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth/cookies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accessToken: accessToken,
        refreshToken: refreshToken,
      }),
    })

    return {
      success: true,
      accessToken: accessToken,
      refreshToken: refreshToken,
    }
  } catch (error) {
    console.error('Error refreshing token:', error)
    return { success: false, error: 'Token refresh error' }
  }
}
