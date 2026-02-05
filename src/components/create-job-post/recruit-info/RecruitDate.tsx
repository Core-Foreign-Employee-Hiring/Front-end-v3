'use client'

import { TextInput } from '@/components/common'
import { UncheckIcon } from '@/assets/svgComponents'

export default function RecruitDate() {
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center gap-x-3">
        <TextInput placeholder={'시작 날짜'} value={''} onChange={(e) => {}} />
        <p className="kr-body-md text-gray4">~</p>
        <TextInput placeholder={'종료 날짜'} value={''} onChange={(e) => {}} />
      </div>
      <div className="flex w-full items-start gap-x-2">
        <UncheckIcon className="mt-1" />
        <div className="flex w-full flex-col gap-y-1">
          <p className="kr-body-md text-gray5">직접 입력</p>
          <TextInput
            placeholder={'상시모집, 채용시 모집마감 등 모집기간에 따라 입력해주세요.'}
            onChange={() => {}}
            value={''}
          />
        </div>
      </div>
    </div>
  )
}
