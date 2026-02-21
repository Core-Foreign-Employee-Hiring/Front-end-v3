'use client'

import { Button, Label, Loading, TextInput } from '@/components/common'
import { postVerifyEmailCode, sendEmailCode } from '@/lib/client/register'
import ErrorMessage from '@/components/common/ErrorMessage'
import SuccessMessage from '@/components/common/SuccessMessage'
import { useRegisterStore } from '@/store/registerStore'
import { validateEmail } from '@/utils/common'
import { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'

export default function EmailField() {
  const { t } = useTranslation('signup')
  const {
    registerData,
    updateRegister,
    verifyEmailErrorMessage,
    verifyEmailSuccessMessage,
    sendEmailCodeLoading,
    verifyEmailCodeLoading,
    verifyEmailCode,
    isVerifyEmailFieldOpen,
    setVerifyEmailErrorMessage,
    setVerifyEmailSuccessMessage,
    setSendEmailCodeLoading,
    setVerifyEmailCodeLoading,
    setVerifyEmailCode,
    setIsVerifyEmailFieldOpen,
  } = useRegisterStore((state) => state)

  const verifyCodeChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setVerifyEmailCode(e.target.value)
    setVerifyEmailErrorMessage('')
    setVerifyEmailSuccessMessage('')
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateRegister('email', e.target.value)
    setVerifyEmailErrorMessage('')
    setVerifyEmailSuccessMessage('')
    setVerifyEmailCode('')
    setIsVerifyEmailFieldOpen(false)
  }

  return (
    <div className="flex flex-col gap-y-2">
      <Label label={t('step1.emailField.label')} isRequired={true} type={'titleSm'} />

      {/* 전화번호 인증 번호 전송 */}
      <div className="flex items-center gap-x-2">
        <TextInput
          value={registerData.email || ''}
          onChange={handleEmailChange}
          placeholder={t('step1.emailField.placeholder')}
        />
        <Button
          onClick={async () => {
            setSendEmailCodeLoading(true)
            const result = await sendEmailCode(registerData.email)
            if (result.success) {
              setSendEmailCodeLoading(false)
              setIsVerifyEmailFieldOpen(true)
            } else {
              setSendEmailCodeLoading(false)
              setVerifyEmailErrorMessage(result.error)
            }
          }}
          leftIcon={sendEmailCodeLoading ? <Loading size={'sm'} /> : null}
          size={'lg'}
          variant={'primary'}
          state={validateEmail(registerData.email) && registerData.email?.length !== 0 ? 'default' : 'disable'}
          customClassName={'w-[130px]'}
        >
          {t('step1.emailField.button.sendCode')}
        </Button>
      </div>

      {/* 인증 코드 */}
      {isVerifyEmailFieldOpen && (
        <div className="flex gap-x-2">
          <TextInput
            value={verifyEmailCode}
            onChange={verifyCodeChange}
            placeholder={t('step1.emailField.verifyCodePlaceholder')}
          />
          <Button
            onClick={async () => {
              setVerifyEmailCodeLoading(true)
              const result = await postVerifyEmailCode(verifyEmailCode)
              if (result.success) {
                setVerifyEmailCodeLoading(false)
                setVerifyEmailSuccessMessage(t('step1.emailField.messages.success'))
              } else {
                setVerifyEmailCodeLoading(false)
                setVerifyEmailErrorMessage(result.error)
              }
            }}
            leftIcon={verifyEmailCodeLoading ? <Loading size={'sm'} /> : null}
            size={'lg'}
            variant={'primary'}
            customClassName={'w-[130px]'}
          >
            {t('step1.emailField.button.verifyCode')}
          </Button>
        </div>
      )}
      {verifyEmailErrorMessage && <ErrorMessage>{verifyEmailErrorMessage}</ErrorMessage>}
      {verifyEmailSuccessMessage && <SuccessMessage>{verifyEmailSuccessMessage}</SuccessMessage>}
    </div>
  )
}
