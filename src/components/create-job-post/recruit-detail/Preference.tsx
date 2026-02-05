'use client'

import { Label, TextInput } from '@/components/common'

export default function Preference() {
  return (
    <div className="flex flex-col gap-y-2">
      <Label label={'우대 사항'} isRequired={true} />
      <TextInput
        textType={'textArea'}
        onChange={(e) => {}}
        value={''}
        placeholder={'보유 시 유리한 조건을 입력해주세요.'}
      />
    </div>
  )
}
