'use client'

import { Button, Label, TextInput } from '@/components/common'

export default function ContractType() {
  return (
    <div className="flex flex-col gap-y-2">
      <Label label={'고용형태'} isRequired={true} type={'titleSm'} />
      <div className="flex gap-x-3">
        <Button variant={'outline'} size={'md'}>
          정규직
        </Button>
        <Button variant={'outline'} size={'md'}>
          인턴
        </Button>
        <Button variant={'outline'} size={'md'}>
          계약직
        </Button>
        <Button variant={'outline'} size={'md'}>
          기타
        </Button>
      </div>
      <div className="flex items-center gap-x-3">
        <div className="kr-subtitle-sm text-gray5 shrink-0">기타사항</div>
        <TextInput placeholder={'기타 고용형태를 입력해주세요.'} onChange={() => {}} value={''} />
      </div>
    </div>
  )
}
