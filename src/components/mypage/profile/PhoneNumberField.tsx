'use client'

import { Button, Label, Loading, TextInput } from '@/components/common'
import { useModifyProfileStore } from '@/store/modifyProfileStore'
import { ChangeEvent } from 'react'
import { postVerifyPhoneNumberCode, sendPhoneNumberCode } from '@/lib/client/register'
import ErrorMessage from '@/components/common/ErrorMessage'
import SuccessMessage from '@/components/common/SuccessMessage'
import { useTranslation } from 'react-i18next'

export default function PhoneNumberField() {
  const { t } = useTranslation('my')
  const {
    modifyProfileData,
    updateProfile,
    sendSMSCodeLoading,
    verifySMSCodeLoading,
    verifyPhoneNumberCode,
    sendSMSCodeErrorMessage,
    setIsVerifyPhoneNumberFieldOpen,
    setSendSMSCodeErrorMessage,
    setVerifySMSCodeErrorMessage,
    setVerifySMSCodeLoading,
    setVerifyPhoneNumberCode,
    setVerifySMSCodeSuccessMessage,
    setSendSMSCodeLoading,
    isVerifyPhoneNumberFieldOpen,
    verifySMSCodeErrorMessage,
    verifySMSCodeSuccessMessage,
  } = useModifyProfileStore((state) => state)
  /**
   * 휴대폰 번호 변경 event handler
   */
  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const rawValue = e.target.value

    // 2. 스토어에 저장할 때는 숫자만 추출 ("010-1234-5678" -> "01012345678")
    const onlyNumbers = rawValue.replace(/[^\d]/g, '').slice(0, 11)

    updateProfile('phoneNumber', onlyNumbers)
    //
    setVerifySMSCodeErrorMessage('')
    setSendSMSCodeErrorMessage('')
    setVerifySMSCodeSuccessMessage('')
    setVerifyPhoneNumberCode('')
    setIsVerifyPhoneNumberFieldOpen(false)
  }

  const verifyCodeChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setVerifyPhoneNumberCode(e.target.value)

    setVerifySMSCodeErrorMessage('')
    setSendSMSCodeErrorMessage('')
    setVerifySMSCodeSuccessMessage('')
  }
  return (
    <div className="flex flex-col gap-y-2">
      <Label label={t('profile.phone_number_field.label')} isRequired={true} type={'titleSm'} />

      {/* 전화번호 인증 번호 전송 */}
      <div className="flex items-center gap-x-2">
        <TextInput
          value={modifyProfileData.phoneNumber || ''}
          onChange={handlePhoneNumberChange}
          placeholder={t('profile.phone_number_field.placeholder')}
        />
        <Button
          onClick={async () => {
            setSendSMSCodeLoading(true)
            const result = await sendPhoneNumberCode(modifyProfileData.phoneNumber)
            if (result.success) {
              setSendSMSCodeLoading(false)
              setIsVerifyPhoneNumberFieldOpen(true)
            } else {
              setSendSMSCodeLoading(false)
              setSendSMSCodeErrorMessage(result.error)
            }
          }}
          leftIcon={sendSMSCodeLoading ? <Loading size={'sm'} /> : null}
          size={'lg'}
          variant={'primary'}
          state={modifyProfileData.phoneNumber?.length !== 11 ? 'disable' : 'default'}
          customClassName={'w-[130px]'}
        >
          {t('profile.phone_number_field.buttons.send_code')}
        </Button>
      </div>

      {/* 인증 코드 */}
      {isVerifyPhoneNumberFieldOpen && (
        <div className="flex gap-x-2">
          <TextInput value={verifyPhoneNumberCode} onChange={verifyCodeChange} placeholder={'인증번호 입력'} />
          <Button
            onClick={async () => {
              setVerifySMSCodeLoading(true)
              const result = await postVerifyPhoneNumberCode(verifyPhoneNumberCode)
              if (result.success) {
                setVerifySMSCodeLoading(false)
                setVerifySMSCodeSuccessMessage(t('profile.phone_number_field.messages.success'))
              } else {
                setVerifySMSCodeLoading(false)
                setVerifySMSCodeErrorMessage(result.error)
              }
            }}
            leftIcon={verifySMSCodeLoading ? <Loading size={'sm'} /> : null}
            size={'lg'}
            variant={'primary'}
            customClassName={'w-[130px]'}
          >
            {t('profile.phone_number_field.buttons.verify_confirm')}
          </Button>
        </div>
      )}
      {sendSMSCodeErrorMessage && <ErrorMessage>{sendSMSCodeErrorMessage}</ErrorMessage>}
      {verifySMSCodeErrorMessage && <ErrorMessage>{verifySMSCodeErrorMessage}</ErrorMessage>}
      {verifySMSCodeSuccessMessage && <SuccessMessage>{verifySMSCodeSuccessMessage}</SuccessMessage>}
    </div>
  )
}
