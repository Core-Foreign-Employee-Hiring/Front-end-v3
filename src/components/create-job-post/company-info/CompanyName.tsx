'use client'

import { Label, TextInput } from '@/components/common'

export default function CompanyName() {
  return (
    <div className="flex flex-col gap-y-2">
      <Label label={'회사명'} isRequired={true} type={'titleSm'} />
      <TextInput onChange={() => {}} value={''} placeholder={'회사명을 입력해주세요.'} />
    </div>
  )
}
