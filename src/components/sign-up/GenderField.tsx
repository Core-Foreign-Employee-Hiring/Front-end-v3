'use client'

import { Button, Label } from '@/components/common'
import { useRegisterStore } from '@/store/registerStore'
import { GenderType } from '@/types/auth/register'
import { useTranslation } from 'react-i18next'

export default function GenderField() {
  const { t } = useTranslation('signup')
  const { registerData, updateRegister } = useRegisterStore((state) => state)
  const genderList: { key: GenderType; content: string }[] = [
    { key: 'MALE', content: t('step2.genderField.options.male') },
    { key: 'FEMALE', content: t('step2.genderField.options.female') },
    { key: 'NULL', content: t('step2.genderField.options.none') },
  ]
  return (
    <div className="flex flex-col gap-y-2">
      <Label label={t('step2.genderField.label')} type={'titleSm'} />
      <div className="flex gap-x-3">
        {genderList.map((gender) => (
          <Button
            onClick={() => {
              updateRegister('gender', gender.key === registerData.gender ? null : gender.key)
            }}
            key={gender.key}
            size={'md'}
            variant={registerData.gender === gender.key ? 'primary' : 'outline'}
          >
            {gender.content}
          </Button>
        ))}
      </div>
    </div>
  )
}
