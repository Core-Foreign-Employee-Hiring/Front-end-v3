'use client'

import { Label, TextInput } from '@/components/common'
import { useFindAuthStore } from '@/store/findAuthStore'
import { useTranslation } from 'react-i18next'

export default function NameField() {
  const { t } = useTranslation('findAuth')
  const { findIdData, updateFindIdData, errorMessage, setIDVerifyCode, setIsIDVerifyCodeFieldOpen, setErrorMessage } =
    useFindAuthStore()

  return (
    <div className="flex flex-col gap-y-2">
      <Label label={t('id.process.name_field.title')} />
      <TextInput
        status={errorMessage ? 'error' : 'default'}
        value={findIdData.name}
        onChange={(e) => {
          updateFindIdData('name', e.target.value)
          setIDVerifyCode('')
          setIsIDVerifyCodeFieldOpen(false)
          setErrorMessage(undefined)
        }}
        placeholder={t('id.process.name_field.placeholder')}
      />
    </div>
  )
}
