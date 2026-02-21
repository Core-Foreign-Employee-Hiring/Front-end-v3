'use client'

import { ChangeEvent } from 'react'
import { useAuthStore } from '@/store/authStore'

import { usePasswordVisible } from '@/hooks'
import { Label, Spacing, TextInput } from '@/components/common'
import { useTranslation } from 'react-i18next'

export default function Password() {
  const { t } = useTranslation('login')
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
      <Label label={t('pw.label')} type="subtitleLg" />
      <Spacing height={8} />
      <TextInput
        status={error ? 'error' : 'default'}
        helperText={error ? error : undefined}
        inputType={inputType}
        value={login.password ?? ''}
        onChange={handlePasswordChange}
        placeholder={t('pw.placeholder')}
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
