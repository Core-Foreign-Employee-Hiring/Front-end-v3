'use client'

import { Label, TextInput } from '@/components/common'

export default function WebSite() {
  return (
    <div className="flex flex-col gap-y-2">
      <Label isOption={true} label={'업종 선택'} />
      <TextInput placeholder={'회사의 웹사이트를 입력해주세요.'} onChange={() => {}} value={''} textType={'textArea'} />
    </div>
  )
}
