'use client'

import { Button, Label } from '@/components/common'

export default function Visa() {
  return (
    <div className="flex flex-col gap-y-2">
      <Label label={'비자 유형'} isOption={true} />
      <Button variant={'outline'} size={'md'} customClassName={'w-[156px]'}>
        비자 선택
      </Button>
    </div>
  )
}
