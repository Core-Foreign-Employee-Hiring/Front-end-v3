'use client'

import { useAuthStore } from '@/store/authStore'

import { Label, Spacing, TextInput } from '@/components/common'
import { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'

export default function Id() {
  const { t } = useTranslation('login')

  const { login, error, setLogin, resetAuthStatus } = useAuthStore((state) => state)

  const handleIdChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLogin({ userId: e.target.value })
    if (error) resetAuthStatus()
  }

  return (
    <div className="w-full">
      <Label type={'subtitleLg'} label={t('id.label')} />
      <Spacing height={8} />
      <TextInput
        status={error ? 'error' : 'default'}
        onChange={handleIdChange}
        value={login.userId ?? ''}
        placeholder={t('id.placeholder')}
      />
    </div>
  )
}
