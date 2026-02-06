'use client'

import { Label, TextInput } from '@/components/common'
import { useModifyProfileStore } from '@/store/modifyProfileStore'

export default function NameField() {
  const { modifyProfileData, updateProfile } = useModifyProfileStore((state) => state)
  return (
    <div className="flex w-full flex-col gap-y-2">
      <Label isRequired={true} label={'이름'} />
      <TextInput
        value={modifyProfileData.name ?? ''}
        onChange={(e) => {
          updateProfile('name', e.target.value)
        }}
      />
    </div>
  )
}
