'use client'

import { Button } from '@/components/common'
import { patchModifyPassword, patchModifyUserId } from '@/lib/client/mypage'
import { useModifyAuthStore } from '@/store/modifyAuthStore'
import { useTranslation } from 'react-i18next'
import { useToast } from '@/components/common/toast/ToastContext'

interface BottomButtonProps {
  type: 'id' | 'pw'
}
export default function BottomButton({ type }: BottomButtonProps) {
  const { t } = useTranslation(['my', 'message'])
  const { success, error } = useToast()
  const { newUserId, setNewUserIdErrorMessage, setNewPasswordErrorMessage, newPassword } = useModifyAuthStore(
    (state) => state
  )
  return (
    <div className="flex w-full justify-end gap-x-4 py-4">
      <Button onClick={() => {}} customClassName={'w-[200px]'} variant={'outline'}>
        {t('change_auth.bottom_buttons.prev')}
      </Button>
      {type === 'id' ? (
        <Button
          onClick={async () => {
            const result = await patchModifyUserId(newUserId)
            if (result.success) {
              success(
                t('message:patch_modify_user_id.success.title'),
                t('message:patch_modify_user_id.success.description')
              )
            } else {
              error(t('message:patch_modify_user_id.error.title'), t('message:patch_modify_user_id.error.description'))
              setNewUserIdErrorMessage(result.error)
            }
          }}
          customClassName={'w-[200px]'}
        >
          {t('change_auth.bottom_buttons.change_id')}
        </Button>
      ) : (
        <Button
          onClick={async () => {
            const result = await patchModifyPassword(newPassword)
            if (result.success) {
              success(
                t('message:patch_modify_password.success.title'),
                t('message:patch_modify_password.success.description')
              )
            } else {
              error(
                t('message:patch_modify_password.error.title'),
                t('message:patch_modify_password.error.description')
              )
              setNewPasswordErrorMessage(result.error)
            }
          }}
          customClassName={'w-[200px]'}
        >
          {t('change_auth.bottom_buttons.change_pw"')}
        </Button>
      )}
    </div>
  )
}
