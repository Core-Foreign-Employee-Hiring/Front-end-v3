'use client'

import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { postAuth } from '@/lib/auth'
import { useSaveId } from '@/hooks'
import { UserInfoType } from '@/types/auth'
import Cookies from 'js-cookie'
import { useEffect } from 'react'

export default function useLoginAction(lang: string) {
  const router = useRouter()
  const { login, isIdSaved, setLoading, setError, setLogin } = useAuthStore()
  const { persistSavedId } = useSaveId()

  const validate = () => {
    if (!login.userId?.trim() || !login.password?.trim()) {
      setError('아이디와 비밀번호를 확인해주세요.')
      return false
    }
    return true
  }

  const applyIdPersistence = () => {
    if (isIdSaved) persistSavedId()
  }

  const navigateTo = () => {
    router.back()
    router.refresh()
  }

  const persistUserInfo = ({ email, name, role, userId }: UserInfoType) => {
    const userInfo = { email, name, role, userId }
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
  }

  const persistCookie = (accessToken: string | undefined, refreshToken: string | undefined) => {
    if (accessToken) {
      Cookies.set('accessToken', accessToken)
    }
    if (refreshToken) {
      Cookies.set('refreshToken', refreshToken)
    }
  }

  useEffect(() => {
    // 컴포넌트가 마운트될 때가 아니라,
    // 컴포넌트가 언마운트(해당 페이지를 나감)될 때만 실행됩니다.
    return () => {
      setLogin({ password: '', userId: '' })
      setError(null) // 에러 메시지도 같이 지워주는 게 보통 좋습니다.
    }
  }, [setLogin, setError]) // 의존성 배열 추가

  const loginProcess = async () => {
    if (!validate()) return

    setLoading(true)
    setError(null)

    try {
      const result = await postAuth(login)

      if (result.success && result) {
        applyIdPersistence()
        navigateTo()
        persistCookie(result.accessToken, result.refreshToken)
        persistUserInfo({ email: result.email, name: result.name, role: result.role, userId: result.userId })
      } else {
        setError(result.error || '로그인 정보를 확인해주세요.')
      }
    } catch (err) {
      setError('네트워크 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return { loginProcess, setLogin }
}
