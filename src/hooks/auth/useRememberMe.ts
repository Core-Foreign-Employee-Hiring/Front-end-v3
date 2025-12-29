'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useToggle } from '@/hooks'

export default function useRememberMe() {
  const setLogin = useAuthStore((state) => state.setLogin)
  const login = useAuthStore((state) => state.login)

  const [isRemembered, toggleState, setIsRemembered] = useToggle(false)

  const removeIdFromStorage = () => {
    localStorage.removeItem('savedUserId')
  }

  const saveIdFromStorage = () => {
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
        setIsRemembered(true)
      }, 0)

      return () => clearTimeout(timer)
    }
  }, [setLogin])

  /**
   * localStorage 에 id를 저장/삭제, 체크 아이콘 toggle 역할을 담당합니다.
   */
  const handleToggle = () => {
    const nextState = !isRemembered
    toggleState()

    if (!nextState) {
      removeIdFromStorage()
    } else {
      saveIdFromStorage()
    }
  }

  return {
    isRemembered,
    handleToggle,
  }
}
