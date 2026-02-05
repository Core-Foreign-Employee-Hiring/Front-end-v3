'use client'

import { Label, TextInput } from '@/components/common'

export default function Language() {
  return (
    <div className="flex flex-col gap-y-2">
      <Label label={'요구 언어 능력'} isOption={true} />
      <TextInput onChange={(e) => {}} value={''} placeholder={'해당 업무에 요구되는 언어능력을 선택하세요.'} />
    </div>
  )
}
