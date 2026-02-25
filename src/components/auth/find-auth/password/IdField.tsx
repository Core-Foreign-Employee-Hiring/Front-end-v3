'use client'

import { Label, TextInput } from '@/components/common'
import { useFindAuthStore } from '@/store/findAuthStore'
import { useTranslation } from 'react-i18next'

export default function IdField() {
  const { t } = useTranslation('findAuth')
  const { findPWData, updateFindPWData, errorMessage, setErrorMessage, setIsPWVerifyCodeFieldOpen, setPWVerifyCode } =
    useFindAuthStore((state) => state)
  return (
    <div className="flex flex-col gap-y-2">
      <Label label={t('pw.process.id_field.label')} />
      <TextInput
        status={errorMessage ? 'error' : 'default'}
        value={findPWData.userId}
        onChange={(e) => {
          updateFindPWData('userId', e.target.value)
          setIsPWVerifyCodeFieldOpen(false)
          setErrorMessage(undefined)
          setPWVerifyCode('')
        }}
        placeholder={t('pw.process.id_field.placeholder')}
      />
    </div>
  )
}
