'use client'

import { Button } from '@/components/common'

export default function BottomButtons() {
  return (
    <div className="fixed bottom-0 left-0 flex w-full justify-between bg-white px-[40px] py-[20px]">
      <Button variant={'outline'} customClassName={'w-[377px]'}>
        이전
      </Button>
      <div className="flex gap-x-3">
        <Button variant={'secondary'} customClassName={'w-[377px]'}>
          임시저장
        </Button>
        <Button variant={'primary'} customClassName={'w-[377px]'}>
          다음
        </Button>
      </div>
    </div>
  )
}
