'use client'

import { Label, TextInput } from '@/components/common'
import { useRegisterStore } from '@/store/registerStore'
import { useTranslation } from 'react-i18next'

export default function NameField() {
  const { t } = useTranslation('signup')
  const { registerData, updateRegister } = useRegisterStore((state) => state)
  return (
    <div className="flex flex-col gap-y-2">
      <Label label={t('step1.nameField.label')} isRequired={true} type={'titleSm'} />
      <TextInput
        value={registerData.name ?? ''}
        onChange={(e) => {
          updateRegister('name', e.target.value)
        }}
        placeholder={t('step1.nameField.placeholder')}
      />
    </div>
  )
}
