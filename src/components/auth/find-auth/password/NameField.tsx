'use client'
import { Label, TextInput } from '@/components/common'
import { useFindAuthStore } from '@/store/findAuthStore'
import { useTranslation } from 'react-i18next'

export default function NameField() {
  const { t } = useTranslation('findAuth')
  const { findPWData, updateFindPWData, errorMessage, setErrorMessage, setPWVerifyCode, setIsPWVerifyCodeFieldOpen } =
    useFindAuthStore((state) => state)

  return (
    <div className="flex flex-col gap-y-2">
      <Label label={t('pw.process.name_field.label')} />
      <TextInput
        status={errorMessage ? 'error' : 'default'}
        value={findPWData.name}
        onChange={(e) => {
          updateFindPWData('name', e.target.value)
          setErrorMessage(undefined)
          setIsPWVerifyCodeFieldOpen(false)
          setPWVerifyCode('')
        }}
        placeholder={t('pw.process.name_field.placeholder')}
      />
    </div>
  )
}
