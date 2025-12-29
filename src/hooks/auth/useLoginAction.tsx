'use client'

import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { postAuth } from '@/lib/auth'
import { useSaveId } from '@/hooks'

export default function useLoginAction(lang: string) {
  const router = useRouter()
  const { login, isIdSaved, setLoading, setError } = useAuthStore()
  const { persistSavedId } = useSaveId()

  const validate = () => {
    if (!login.userId?.trim() || !login.password?.trim()) {
      setError('아이디와 비밀번호를 확인해주세요.')
      return false
    }
    return true
  }

  const handleSuccess = () => {
    if (isIdSaved) persistSavedId()
    router.push(`/${lang}`)
  }

  const loginProcess = async () => {
    if (!validate()) return

    setLoading(true)
    setError(null)

    try {
      const result = await postAuth(login)

      if (result.success) {
        handleSuccess()
      } else {
        setError(result.error || '로그인 정보를 확인해주세요.')
      }
    } catch (err) {
      setError('네트워크 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return { loginProcess }
}
