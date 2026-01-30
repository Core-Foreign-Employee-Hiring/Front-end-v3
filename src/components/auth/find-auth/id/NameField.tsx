'use client'

import { Label, TextInput } from '@/components/common'
import { useFindAuthStore } from '@/store/findAuthStore'

export default function NameField() {
  const { findIdData, updateFindIdData, errorMessage, setIDVerifyCode, setIsIDVerifyCodeFieldOpen, setErrorMessage } =
    useFindAuthStore()

  return (
    <div className="flex flex-col gap-y-2">
      <Label label={'이름'} />
      <TextInput
        status={errorMessage ? 'error' : 'default'}
        value={findIdData.name}
        onChange={(e) => {
          updateFindIdData('name', e.target.value)
          setIDVerifyCode('')
          setIsIDVerifyCodeFieldOpen(false)
          setErrorMessage(undefined)
        }}
        placeholder={'이름을 입력해주세요.'}
      />
    </div>
  )
}
