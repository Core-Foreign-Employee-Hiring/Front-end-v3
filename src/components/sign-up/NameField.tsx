'use client'

import { Label, TextInput } from '@/components/common'
import { useRegisterStore } from '@/store/registerStore'

export default function NameField() {
  const { registerData, updateRegister } = useRegisterStore((state) => state)
  return (
    <div className="flex flex-col gap-y-2">
      <Label label={'이름'} isRequired={true} type={'titleSm'} />
      <TextInput
        value={registerData.name ?? ''}
        onChange={(e) => {
          updateRegister('name', e.target.value)
        }}
        placeholder={'이름을 입력해주세요.'}
      />
    </div>
  )
}
