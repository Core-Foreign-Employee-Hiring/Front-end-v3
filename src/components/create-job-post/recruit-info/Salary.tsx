'use client'

import { Label, TextInput } from '@/components/common'

export default function Salary() {
  return (
    <div className="flex flex-col gap-y-2">
      <Label isOption={true} label={'급여'} type={'titleSm'} />
      <div className="flex gap-x-3">
        {/*<TextInput></TextInput>*/}
        <TextInput value={''} onChange={(e) => {}} placeholder={'급여를 입력해주세요.'} />
      </div>
      <div className="flex items-center gap-x-2">
        <div className="kr-subtitle-sm text-gray5 shrink-0">기타사항</div>
        <TextInput
          value={''}
          onChange={(e) => {}}
          placeholder={'급여 기타사항을 작성해주세요. (예: 면접 후 협의 또는 회사 내규에 따를 경우 등) '}
        />
      </div>
    </div>
  )
}
