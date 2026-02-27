'use client'

import { useEffect } from 'react'
import { useModalStore } from '@/store/modalStore'
import Cookies from 'js-cookie' // 쿠키 확인을 위한 라이브러리 추가

interface Props {
  results: Array<{ status?: string | number; error?: string } | undefined>
}

export default function AuthWatcher({ results }: Props) {
  const setModal = useModalStore((state) => state.setModal)

  useEffect(() => {
    // 1. 쿠키에서 토큰 존재 여부 확인
    const accessToken = Cookies.get('accessToken')
    const refreshToken = Cookies.get('refreshToken')

    // 2. 이미 로그인 상태(토큰이 있음)라면 401 에러가 나더라도 모달을 띄우지 않음
    // (토큰이 있는데 401이 나는 경우는 만료된 경우이므로, 이때는 보통 interceptor에서 갱신 처리를 함)
    if (accessToken || refreshToken) {
      return
    }

    // 3. 토큰이 없는 상태에서만 401 에러 확인
    const hasAuthError = results.some(
      (res) => res?.status === 401 || res?.status === '401' || res?.error?.includes('401')
    )

    if (hasAuthError) {
      console.log('인증 에러 발견: 로그인 모달을 띄웁니다.')
      setModal('isRequiredLoginModalOpen', true)
    }
  }, [results, setModal])

  return null
}
