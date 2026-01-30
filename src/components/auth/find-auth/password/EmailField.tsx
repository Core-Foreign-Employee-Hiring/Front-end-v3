'use client'

import { Button, Label, Loading, TextInput } from '@/components/common'
import { useFindAuthStore } from '@/store/findAuthStore'
import { validateEmail } from '@/utils/common'
import { postFindPW } from '@/lib/client/find-auth'
import { ChangeEvent } from 'react'
import ErrorMessage from '@/components/common/ErrorMessage'

export default function EmailField() {
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
      <Label label={'이메일'} />
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
          placeholder={'이메일을 입력해주세요.'}
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
          이메일 전송
        </Button>
      </div>

      {isPWVerifyCodeFieldOpen ? (
        <TextInput
          status={errorMessage ? 'error' : 'default'}
          value={pwVerifyCode}
          onChange={verifyCodeChange}
          placeholder={'인증번호 입력'}
        />
      ) : null}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </div>
  )
}
