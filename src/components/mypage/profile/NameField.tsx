'use client'

import { Label, TextInput } from '@/components/common'
import { useModifyProfileStore } from '@/store/modifyProfileStore'
import { useTranslation } from 'react-i18next'

export default function NameField() {
  const { t } = useTranslation('my')
  const { modifyProfileData, updateProfile } = useModifyProfileStore((state) => state)
  return (
    <div className="flex w-full flex-col gap-y-2">
      <Label isRequired={true} label={t('profile.name_field.label')} />
      <TextInput
        value={modifyProfileData.name ?? ''}
        onChange={(e) => {
          updateProfile('name', e.target.value)
        }}
      />
    </div>
  )
}
