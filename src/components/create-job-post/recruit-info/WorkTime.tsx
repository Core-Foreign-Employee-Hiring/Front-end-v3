'use client'

import { Label, TextInput } from '@/components/common'

export default function WorkTime() {
  return (
    <div className="flex flex-col gap-y-2">
      <Label label={'근무 시간'} isRequired={true} type={'titleSm'} />
      <div className="gapx-x-3 flex">{/*<DropDown />*/}</div>
      <div className="flex items-center gap-x-3">
        <div className="kr-subtitle-sm text-gray5 shrink-0">기타사항</div>
        <TextInput placeholder={'기타 근무형태를 입력해주세요.'} onChange={(e) => {}} value={''} />
      </div>
    </div>
  )
}
