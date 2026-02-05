'use client'

import { Label, TextInput } from '@/components/common'

export default function Introduce() {
  return (
    <div className="flex flex-col gap-y-2">
      <Label isOption={true} label={'회사 소개'} />
      <TextInput placeholder={'회사 소개를 입력해주세요.'} onChange={() => {}} value={''} textType={'textArea'} />
    </div>
  )
}
