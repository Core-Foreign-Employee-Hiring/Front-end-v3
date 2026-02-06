'use client'

import { Button, Label, Loading, TextInput } from '@/components/common'
import { useModifyProfileStore } from '@/store/modifyProfileStore'
import { ChangeEvent } from 'react'
import { postVerifyEmailCode, sendEmailCode } from '@/lib/client/register'
import { validateEmail } from '@/utils/common'
import ErrorMessage from '@/components/common/ErrorMessage'
import SuccessMessage from '@/components/common/SuccessMessage'

export default function EmailField() {
  const {
    modifyProfileData,
    updateProfile,
    verifyEmailCode,
    sendEmailCodeErrorMessage,
    verifyEmailCodeErrorMessage,
    verifyEmailCodeSuccessMessage,
    sendEmailCodeLoading,
    verifyEmailCodeLoading,
    isVerifyEmailFieldOpen,

    setVerifyEmailCode,
    setSendEmailCodeErrorMessage,
    setVerifyEmailCodeErrorMessage,
    setVerifyEmailCodeSuccessMessage,
    setSendEmailCodeLoading,
    setVerifyEmailCodeLoading,
    setIsVerifyEmailFieldOpen,
  } = useModifyProfileStore((state) => state)

  const verifyCodeChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setVerifyEmailCode(e.target.value)
    setSendEmailCodeErrorMessage('')
    setVerifyEmailCodeErrorMessage('')
    setVerifyEmailCodeSuccessMessage('')
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateProfile('email', e.target.value)
    setSendEmailCodeErrorMessage('')
    setVerifyEmailCodeErrorMessage('')
    setVerifyEmailCodeSuccessMessage('')
    setVerifyEmailCode('')
    setIsVerifyEmailFieldOpen(false)
  }

  return (
    <div className="flex flex-col gap-y-2">
      <Label label={'이메일'} isRequired={true} type={'titleSm'} />

      {/* 전화번호 인증 번호 전송 */}
      <div className="flex items-center gap-x-2">
        <TextInput
          value={modifyProfileData.email || ''}
          onChange={handleEmailChange}
          placeholder={'이메일을 입력해주세요.'}
        />
        <Button
          onClick={async () => {
            setSendEmailCodeLoading(true)
            const result = await sendEmailCode(modifyProfileData.email)
            if (result.success) {
              setSendEmailCodeLoading(false)
              setIsVerifyEmailFieldOpen(true)
            } else {
              setSendEmailCodeLoading(false)
              setSendEmailCodeErrorMessage(result.error)
            }
          }}
          leftIcon={sendEmailCodeLoading ? <Loading size={'sm'} /> : null}
          size={'lg'}
          variant={'primary'}
          state={
            validateEmail(modifyProfileData.email) && modifyProfileData.email?.length !== 0 ? 'default' : 'disable'
          }
          customClassName={'w-[130px]'}
        >
          인증번호
        </Button>
      </div>

      {/* 인증 코드 */}
      {isVerifyEmailFieldOpen && (
        <div className="flex gap-x-2">
          <TextInput value={verifyEmailCode} onChange={verifyCodeChange} placeholder={'인증번호 입력'} />
          <Button
            onClick={async () => {
              setVerifyEmailCodeLoading(true)
              const result = await postVerifyEmailCode(verifyEmailCode)
              if (result.success) {
                setVerifyEmailCodeLoading(false)
                setVerifyEmailCodeSuccessMessage('인증되었습니다.')
              } else {
                setVerifyEmailCodeLoading(false)
                setVerifyEmailCodeErrorMessage(result.error)
              }
            }}
            leftIcon={verifyEmailCodeLoading ? <Loading size={'sm'} /> : null}
            size={'lg'}
            variant={'primary'}
            customClassName={'w-[130px]'}
          >
            인증확인
          </Button>
        </div>
      )}
      {sendEmailCodeErrorMessage && <ErrorMessage>{sendEmailCodeErrorMessage}</ErrorMessage>}
      {verifyEmailCodeErrorMessage && <ErrorMessage>{verifyEmailCodeErrorMessage}</ErrorMessage>}
      {verifyEmailCodeSuccessMessage && <SuccessMessage>{verifyEmailCodeSuccessMessage}</SuccessMessage>}
    </div>
  )
}
