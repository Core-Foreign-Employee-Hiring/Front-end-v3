'use client'

import { Button } from '@/components/common'
import { patchModifyPassword, patchModifyUserId } from '@/lib/client/mypage'
import { useModifyAuthStore } from '@/store/modifyAuthStore'

interface BottomButtonProps {
  type: 'id' | 'pw'
}
export default function BottomButton({ type }: BottomButtonProps) {
  const { newUserId, setNewUserIdErrorMessage, setNewPasswordErrorMessage, newPassword } = useModifyAuthStore(
    (state) => state
  )
  return (
    <div className="flex w-full justify-end gap-x-4 py-4">
      <Button onClick={() => {}} customClassName={'w-[200px]'} variant={'outline'}>
        이전
      </Button>
      {type === 'id' ? (
        <Button
          onClick={async () => {
            const result = await patchModifyUserId(newUserId)
            if (result.success) {
              console.log('아이디 변경 성공')
            } else {
              setNewUserIdErrorMessage(result.error)
            }
          }}
          customClassName={'w-[200px]'}
        >
          아이디 변경
        </Button>
      ) : (
        <Button
          onClick={async () => {
            const result = await patchModifyPassword(newPassword)
            if (result.success) {
              console.log('비밀번호 변경 성공')
            } else {
              setNewPasswordErrorMessage(result.error)
            }
          }}
          customClassName={'w-[200px]'}
        >
          비밀번호 변경
        </Button>
      )}
    </div>
  )
}
