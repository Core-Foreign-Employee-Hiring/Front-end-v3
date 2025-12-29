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
    localStorage.setItem('savedUserId', login.userId)
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
