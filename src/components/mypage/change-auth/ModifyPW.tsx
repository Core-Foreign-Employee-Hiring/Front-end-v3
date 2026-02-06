'use client'

import { Label, TextInput } from '@/components/common'
import ErrorMessage from '@/components/common/ErrorMessage'
import { useModifyAuthStore } from '@/store/modifyAuthStore'

export default function ModifyPW() {
  const { newPassword, setNewPassword, setNewPasswordErrorMessage, newPasswordErrorMessage } = useModifyAuthStore(
    (state) => state
  )
  return (
    <div className="flex flex-col gap-y-2">
      <Label label={'새 비밀번호'} />
      <TextInput
        value={newPassword}
        onChange={(e) => {
          setNewPassword(e.target.value)
        }}
        placeholder={'새 비밀번호를 입력해주세요.'}
      />
      {newPasswordErrorMessage && <ErrorMessage>{newPasswordErrorMessage}</ErrorMessage>}
    </div>
  )
}
