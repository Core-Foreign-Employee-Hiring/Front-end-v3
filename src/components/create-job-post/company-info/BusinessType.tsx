'use client'

import { Label } from '@/components/common'

export default function BusinessType() {
  return (
    <div className="flex flex-col gap-y-2">
      <Label isOption={true} label={'업종 선택'} />
      {/*<TextInput placeholder={'회사 소개를 입력해주세요.'} onChange={() => {}} value={''} textType={'textArea'} />*/}
    </div>
  )
}
