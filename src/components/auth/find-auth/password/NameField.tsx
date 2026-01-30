'use client'
import { Label, TextInput } from '@/components/common'
import { useFindAuthStore } from '@/store/findAuthStore'

export default function NameField() {
  const { findPWData, updateFindPWData, errorMessage, setErrorMessage, setPWVerifyCode, setIsPWVerifyCodeFieldOpen } =
    useFindAuthStore((state) => state)

  return (
    <div className="flex flex-col gap-y-2">
      <Label label={'이름'} />
      <TextInput
        status={errorMessage ? 'error' : 'default'}
        value={findPWData.name}
        onChange={(e) => {
          updateFindPWData('name', e.target.value)
          setErrorMessage(undefined)
          setIsPWVerifyCodeFieldOpen(false)
          setPWVerifyCode('')
        }}
        placeholder={'이름을 입력해주세요.'}
      />
    </div>
  )
}
