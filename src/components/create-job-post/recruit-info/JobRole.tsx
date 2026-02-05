'use client'

import { Button, Label } from '@/components/common'

export default function JobRole() {
  return (
    <div className="flex flex-col gap-y-2">
      <Label label={'직무 선택'} isRequired={true} type={'titleSm'} />
      <Button variant={'outline'} size={'md'} customClassName={'w-[156px]'}>
        직무 선택
      </Button>
    </div>
  )
}
