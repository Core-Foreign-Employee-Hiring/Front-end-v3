'use client'

import { Button, Label, Loading, TextInput } from '@/components/common'
import { useRegisterStore } from '@/store/registerStore'
import { postVerifyPhoneNumberCode, sendPhoneNumberCode } from '@/lib/client/register'
import { ChangeEvent } from 'react'
import ErrorMessage from '@/components/common/ErrorMessage'
import SuccessMessage from '@/components/common/SuccessMessage'
import { useTranslation } from 'react-i18next'

export default function PhoneNumberField() {
  const { t } = useTranslation('signup')
  const {
    registerData,
    updateRegister,
    verifyPhoneErrorMessage,
    verifyPhoneSuccessMessage,
    sendSMSCodeLoading,
    verifySMSCodeLoading,
    verifyPhoneNumberCode,
    isVerifyPhoneNumberFieldOpen,
    setSendSMSCodeLoading,
    setVerifyPhoneErrorMessage,
    setVerifyPhoneSuccessMessage,
    setVerifySMSCodeLoading,
    setVerifyPhoneNumberCode,
    setIsVerifyPhoneNumberFieldOpen,
  } = useRegisterStore((state) => state)

  /**
   * 휴대폰 번호 변경 event handler
   */
  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const rawValue = e.target.value

    // 2. 스토어에 저장할 때는 숫자만 추출 ("010-1234-5678" -> "01012345678")
    const onlyNumbers = rawValue.replace(/[^\d]/g, '').slice(0, 11)

    updateRegister('phoneNumber', onlyNumbers)

    setVerifyPhoneErrorMessage('')
    setVerifyPhoneSuccessMessage('')
    setVerifyPhoneNumberCode('')
    setIsVerifyPhoneNumberFieldOpen(false)
  }

  const verifyCodeChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setVerifyPhoneNumberCode(e.target.value)

    setVerifyPhoneErrorMessage('')
    setVerifyPhoneSuccessMessage('')
  }

  return (
    <div className="flex flex-col gap-y-2">
      <Label label={t('step1.phoneNumberField.label')} isRequired={true} type={'titleSm'} />

      {/* 전화번호 인증 번호 전송 */}
      <div className="flex items-center gap-x-2">
        <TextInput
          value={registerData.phoneNumber || ''}
          onChange={handlePhoneNumberChange}
          placeholder={t('step1.phoneNumberField.placeholder')}
        />
        <Button
          onClick={async () => {
            setSendSMSCodeLoading(true)
            const result = await sendPhoneNumberCode(registerData.phoneNumber)
            if (result.success) {
              setSendSMSCodeLoading(false)
              setIsVerifyPhoneNumberFieldOpen(true)
            } else {
              setSendSMSCodeLoading(false)
              setVerifyPhoneErrorMessage(result.error)
            }
          }}
          leftIcon={sendSMSCodeLoading ? <Loading size={'sm'} /> : null}
          size={'lg'}
          variant={'primary'}
          state={registerData.phoneNumber?.length !== 11 ? 'disable' : 'default'}
          customClassName={'w-[130px]'}
        >
          {t('step1.phoneNumberField.button.sendCode')}
        </Button>
      </div>

      {/* 인증 코드 */}
      {isVerifyPhoneNumberFieldOpen && (
        <div className="flex gap-x-2">
          <TextInput
            value={verifyPhoneNumberCode}
            onChange={verifyCodeChange}
            placeholder={t('step1.phoneNumberField.verifyCodePlaceholder')}
          />
          <Button
            onClick={async () => {
              setVerifySMSCodeLoading(true)
              const result = await postVerifyPhoneNumberCode(verifyPhoneNumberCode)
              if (result.success) {
                setVerifySMSCodeLoading(false)
                setVerifyPhoneSuccessMessage(t('step1.phoneNumberField.messages.success'))
              } else {
                setVerifySMSCodeLoading(false)
                setVerifyPhoneErrorMessage(result.error)
              }
            }}
            leftIcon={verifySMSCodeLoading ? <Loading size={'sm'} /> : null}
            size={'lg'}
            variant={'primary'}
            customClassName={'w-[130px]'}
          >
            {t('step1.phoneNumberField.button.verifyCode')}
          </Button>
        </div>
      )}
      {verifyPhoneErrorMessage && <ErrorMessage>{verifyPhoneErrorMessage}</ErrorMessage>}
      {verifyPhoneSuccessMessage && <SuccessMessage>{verifyPhoneSuccessMessage}</SuccessMessage>}
    </div>
  )
}
