'use client'

import { Button, Label, Loading, TextInput } from '@/components/common'
import { useFindAuthStore } from '@/store/findAuthStore'
import { validateEmail } from '@/utils/common'
import { postFindPW } from '@/lib/client/find-auth'
import { ChangeEvent } from 'react'
import ErrorMessage from '@/components/common/ErrorMessage'
import { useTranslation } from 'react-i18next'

export default function EmailField() {
  const { t } = useTranslation('findAuth')
  const {
    setIsSendEmailCodeLoading,
    isSendEmailCodeLoading,
    findPWData,
    updateFindPWData,
    errorMessage,
    setErrorMessage,
    pwVerifyCode,
    setPWVerifyCode,
    isPWVerifyCodeFieldOpen,
    setIsPWVerifyCodeFieldOpen,
  } = useFindAuthStore((state) => state)

  const verifyCodeChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPWVerifyCode(e.target.value)
    setErrorMessage(undefined)
  }

  return (
    <div className="flex flex-col gap-y-2">
      <Label label={t('pw.process.email_field.label')} />
      <div className="flex items-center gap-x-2">
        <TextInput
          status={errorMessage ? 'error' : 'default'}
          value={findPWData.email}
          onChange={(e) => {
            updateFindPWData('email', e.target.value)
            setIsPWVerifyCodeFieldOpen(false)
            setErrorMessage(undefined)
            setPWVerifyCode('')
          }}
          placeholder={t('pw.process.email_field.placeholder')}
        />
        <Button
          onClick={async () => {
            setIsSendEmailCodeLoading(true)
            setErrorMessage(undefined)
            const result = await postFindPW(findPWData)
            console.log('result', result)
            if (result.success) {
              setIsSendEmailCodeLoading(false)
              setIsPWVerifyCodeFieldOpen(true)
            } else {
              setIsSendEmailCodeLoading(false)
              setErrorMessage(result.error)
            }
          }}
          state={
            validateEmail(findPWData.email) && findPWData.email.length !== 0 && findPWData.name.length !== 0
              ? 'default'
              : 'disable'
          }
          variant={'primary'}
          size={'lg'}
          leftIcon={isSendEmailCodeLoading ? <Loading size={'sm'} /> : null}
          customClassName={'w-[150px]'}
        >
          {t('pw.process.email_field.buttons.send_email_code')}
        </Button>
      </div>

      {isPWVerifyCodeFieldOpen ? (
        <TextInput
          status={errorMessage ? 'error' : 'default'}
          value={pwVerifyCode}
          onChange={verifyCodeChange}
          placeholder={t('pw.process.email_field.buttons.verify_code')}
        />
      ) : null}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </div>
  )
}
