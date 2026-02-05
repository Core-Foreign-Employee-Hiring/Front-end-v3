'use client'

import { Button, Label, TextInput } from '@/components/common'

export default function Career() {
  return (
    <div className="flex flex-col gap-y-2">
      <Label label={'경력'} isRequired={true} type={'titleSm'} />
      <div className="flex gap-x-3">
        <Button size={'md'} variant={'outline'}>
          신입
        </Button>
        <Button size={'md'} variant={'outline'}>
          경력
        </Button>
        <Button size={'md'} variant={'outline'}>
          경력 무관
        </Button>
      </div>
      <TextInput placeholder={'경력 연차 입력 (예: 1~3년, 3~5년)'} value={''} onChange={(e) => {}} />
    </div>
  )
}
