'use client'

import { Label, TextInput } from '@/components/common'
import { useModifyAuthStore } from '@/store/modifyAuthStore'
import ErrorMessage from '@/components/common/ErrorMessage'

export default function ModifyId() {
  const { newUserId, setNewUserId, newUserIdErrorMessage } = useModifyAuthStore((state) => state)
  return (
    <div className="flex flex-col gap-y-2">
      <Label label={'새 아이디'} />
      <TextInput
        value={newUserId}
        onChange={(e) => {
          setNewUserId(e.target.value)
        }}
        placeholder={'새 아이디를 입력해주세요.'}
      />
      {newUserIdErrorMessage && <ErrorMessage>{newUserIdErrorMessage}</ErrorMessage>}
    </div>
  )
}
