'use client'

import { Button, Label } from '@/components/common'

export default function Language() {
  return (
    <div className="flex flex-col gap-y-2">
      <Label label={'요구 언어 능력'} isOption={true} />
      <Button variant={'outline'} size={'md'} customClassName={'w-[156px]'}>
        언어 선택
      </Button>
    </div>
  )
}
