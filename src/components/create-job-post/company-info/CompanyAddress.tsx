'use client'

import { Button, TextInput } from '@/components/common'

export default function CompanyAddress() {
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex gap-x-2">
        <TextInput onChange={() => {}} value={''} placeholder={'우편번호'} onClick={() => {}} />
        <Button customClassName="w-[130px]">우편번호 검색</Button>
      </div>
      <TextInput onChange={() => {}} value={''} placeholder={'주소'} />
      <TextInput onChange={() => {}} value={''} placeholder={'상세주소를 입력해주세요.'} />
    </div>
  )
}
