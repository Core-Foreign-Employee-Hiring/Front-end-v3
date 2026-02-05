'use client'

import { Label, TextInput } from '@/components/common'

export default function ApplicationMethod() {
  return (
    <div className="flex flex-col gap-y-2">
      <Label label={'지원방법'} isRequired={true} />
      <div className="flex gap-x-3">
        <div className="flex gap-x-2">
          <div className="bg-main-500 flex h-[20px] w-[20px] items-center justify-center rounded-full">
            <div className="h-[10px] w-[10px] rounded-full bg-white" />
          </div>
          <p className="kr-button text-gray5">홈페이지 지원</p>
        </div>

        <div className="flex gap-x-2">
          <div className="bg-main-500 flex h-[20px] w-[20px] items-center justify-center rounded-full">
            <div className="h-[10px] w-[10px] rounded-full bg-white" />
          </div>
          <p className="kr-button text-gray5">전화/문자 지원</p>
        </div>

        <div className="flex gap-x-2">
          <div className="bg-main-500 flex h-[20px] w-[20px] items-center justify-center rounded-full">
            <div className="h-[10px] w-[10px] rounded-full bg-white" />
          </div>
          <p className="kr-button text-gray5">이메일 지원</p>
        </div>
      </div>
      <div className="flex items-center gap-x-3">
        <div className="kr-subtitle-sm text-gray5 shrink-0">링크</div>
        <TextInput value={''} onChange={(e) => {}} placeholder={'링크를 입력해주세요.'} />
      </div>
    </div>
  )
}
