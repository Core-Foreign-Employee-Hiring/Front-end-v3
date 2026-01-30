'use client'

import { Label, TextInput } from '@/components/common'
import { useFindAuthStore } from '@/store/findAuthStore'

export default function IdField() {
  const { findPWData, updateFindPWData, errorMessage, setErrorMessage, setIsPWVerifyCodeFieldOpen, setPWVerifyCode } =
    useFindAuthStore((state) => state)
  return (
    <div className="flex flex-col gap-y-2">
      <Label label={'아이디'} />
      <TextInput
        status={errorMessage ? 'error' : 'default'}
        value={findPWData.userId}
        onChange={(e) => {
          updateFindPWData('userId', e.target.value)
          setIsPWVerifyCodeFieldOpen(false)
          setErrorMessage(undefined)
          setPWVerifyCode('')
        }}
        placeholder={'아이디를 입력해주세요.'}
      />
    </div>
  )
}
