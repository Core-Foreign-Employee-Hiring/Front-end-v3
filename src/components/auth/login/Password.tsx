'use client'

import { ChangeEvent } from 'react'
import { useAuthStore } from '@/store/authStore'

import { usePasswordVisible } from '@/hooks'
import { Label, Spacing, TextInput } from '@/components/common'

export default function Password() {
  const { login, error, setLogin, resetAuthStatus } = useAuthStore((state) => state)

  const { toggleVisibility, VisibilityIcon, inputType } = usePasswordVisible()

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLogin({ password: e.target.value })
    if (error) resetAuthStatus()
  }

  const handleToggleClick = (e: MouseEvent) => {
    e.preventDefault()
    toggleVisibility()
  }

  return (
    <div className="w-full">
      <Label label="비밀번호" type="subtitleLg" />
      <Spacing height={8} />
      <TextInput
        status={error ? 'error' : 'default'}
        helperText={error ? error : undefined}
        inputType={inputType}
        value={login.password ?? ''}
        onChange={handlePasswordChange}
        placeholder="비밀번호를 입력해주세요."
        rightElement={
          <VisibilityIcon
            onClick={() => handleToggleClick}
            className="text-gray4 hover:text-main-500 cursor-pointer transition-colors"
            height={24}
            width={24}
          />
        }
      />
    </div>
  )
}
