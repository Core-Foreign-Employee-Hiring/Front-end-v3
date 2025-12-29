'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'

export default function useSaveId() {
  const { setLogin, login, isIdSaved, setIsIdSaved } = useAuthStore((state) => state)

  const removeIdFromStorage = () => {
    localStorage.removeItem('savedUserId')
  }

  const toggleSaveIdStatus = () => {
    const nextState = !isIdSaved
    setIsIdSaved(nextState)
  }

  const persistSavedId = () => {
    const userId = login.userId

    if (userId) {
      localStorage.setItem('savedUserId', userId)
    }
  }

  useEffect(() => {
    const savedUserId = localStorage.getItem('savedUserId')

    if (savedUserId) {
      const timer = setTimeout(() => {
        setLogin({ userId: savedUserId })
        setIsIdSaved(true)
      }, 0)

      return () => clearTimeout(timer)
    }
  }, [setLogin])

  /**
   * localStorage 에 id를 저장/삭제, 체크 아이콘 toggle 역할을 담당합니다.
   */
  const handleToggle = () => {
    const nextState = !isIdSaved
    toggleSaveIdStatus()

    if (!nextState) {
      removeIdFromStorage()
    } else {
      persistSavedId()
    }
  }

  return { isIdSaved, handleToggle, persistSavedId }
}
