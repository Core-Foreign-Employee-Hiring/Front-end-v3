// @/components/auth/AuthWatcher.tsx
'use client'

import { useEffect } from 'react'
import { useModalStore } from '@/store/modalStore'

interface Props {
  results: Array<{ status?: string | number; error?: string } | undefined>
}

export default function AuthWatcher({ results }: Props) {
  const setModal = useModalStore((state) => state.setModal)

  useEffect(() => {
    // 배열 중 하나라도 401 에러가 있는지 확인
    const hasAuthError = results.some(
      (res) => res?.status === 401 || res?.status === '401' || res?.error === 'HTTP Error: 401'
    )

    if (hasAuthError) {
      setModal('isRequiredLoginModalOpen', true)
    }
  }, [results, setModal])

  return null
}
