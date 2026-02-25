'use client'

import { Button, Label } from '@/components/common'
import { GenderType } from '@/types/auth/register'
import { useModifyProfileStore } from '@/store/modifyProfileStore'
import { useTranslation } from 'react-i18next'

export default function GenderField() {
  const { t } = useTranslation('my')
  const { modifyProfileData, updateProfile } = useModifyProfileStore((state) => state)
  const genderList: { key: GenderType; content: string }[] = [
    { key: 'MALE', content: t('profile.gender_field.list.male') },
    { key: 'FEMALE', content: t('profile.gender_field.list.female') },
    { key: 'NULL', content: t('profile.gender_field.list.null') },
  ]
  return (
    <div className="flex flex-col gap-y-2">
      <Label label={t('profile.gender_field.label')} type={'titleSm'} />
      <div className="flex gap-x-3">
        {genderList.map((gender) => (
          <Button
            onClick={() => {
              updateProfile('gender', gender.key === modifyProfileData.gender ? null : gender.key)
            }}
            key={gender.key}
            size={'md'}
            variant={modifyProfileData.gender === gender.key ? 'primary' : 'outline'}
          >
            {gender.content}
          </Button>
        ))}
      </div>
    </div>
  )
}
