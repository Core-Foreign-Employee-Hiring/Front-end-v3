'use client'

import { Label, TextInput } from '@/components/common'

export default function Visa() {
  return (
    <div className="flex flex-col gap-y-2">
      <Label label={'비자 유형'} isOption={true} />
      <TextInput onChange={(e) => {}} value={''} placeholder={'비자를 선택하세요.'} />
    </div>
  )
}
