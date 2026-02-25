'use client'

import { Label, TextInput } from '@/components/common'
import { useModifyAuthStore } from '@/store/modifyAuthStore'
import ErrorMessage from '@/components/common/ErrorMessage'
import { useTranslation } from 'react-i18next'

export default function ModifyId() {
  const { t } = useTranslation('my')
  const { newUserId, setNewUserId, newUserIdErrorMessage } = useModifyAuthStore((state) => state)
  return (
    <div className="flex flex-col gap-y-2">
      <Label label={t('change_auth.modify_id.label')} />
      <TextInput
        value={newUserId}
        onChange={(e) => {
          setNewUserId(e.target.value)
        }}
        placeholder={t('change_auth.modify_id.placeholder')}
      />
      {newUserIdErrorMessage && <ErrorMessage>{newUserIdErrorMessage}</ErrorMessage>}
    </div>
  )
}
