'use client'

import { Label, TextInput } from '@/components/common'
import ErrorMessage from '@/components/common/ErrorMessage'
import { useModifyAuthStore } from '@/store/modifyAuthStore'
import { useTranslation } from 'react-i18next'

export default function ModifyPW() {
  const { t } = useTranslation('my')
  const { newPassword, setNewPassword, setNewPasswordErrorMessage, newPasswordErrorMessage } = useModifyAuthStore(
    (state) => state
  )
  return (
    <div className="flex flex-col gap-y-2">
      <Label label={t('change_auth.modify_pw.label')} />
      <TextInput
        value={newPassword}
        onChange={(e) => {
          setNewPassword(e.target.value)
        }}
        placeholder={t('change_auth.modify_pw.placeholder')}
      />
      {newPasswordErrorMessage && <ErrorMessage>{newPasswordErrorMessage}</ErrorMessage>}
    </div>
  )
}
