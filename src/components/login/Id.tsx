'use client'

import { useAuthStore } from '@/store/authStore'

import { Label, Spacing, TextInput } from '@/components/common'
import { ChangeEvent } from 'react'

export default function Id() {
  const { login, error, setLogin, resetAuthStatus } = useAuthStore((state) => state)

  const handleIdChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLogin({ userId: e.target.value })
    if (error) resetAuthStatus()
  }

  return (
    <div className="w-full">
      <Label type={'subtitleLg'} label={'아이디'} />
      <Spacing height={8} />
      <TextInput
        status={error ? 'error' : 'default'}
        onChange={handleIdChange}
        value={login.userId ?? ''}
        placeholder="아아디를 입력해주세요."
      />
    </div>
  )
}
