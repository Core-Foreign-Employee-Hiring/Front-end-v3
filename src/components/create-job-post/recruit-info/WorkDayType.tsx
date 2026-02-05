'use client'

import { Button, Label, TextInput } from '@/components/common'

export default function WorkDayType() {
  return (
    <div className="flex flex-col gap-y-2">
      <Label label={'근무 요일'} isRequired={true} type={'titleSm'} />
      <div className="flex flex-col gap-y-[20px]">
        <div className="flex flex-col gap-y-3">
          <div className="flex items-center gap-x-2">
            <div className="bg-main-500 flex h-[20px] w-[20px] items-center justify-center rounded-full">
              <div className="h-[10px] w-[10px] rounded-full bg-white" />
            </div>
            <p className="kr-button text-gray5">목록에서 선택</p>
          </div>
          <div className="flex gap-x-3">
            <Button size={'md'} variant={'outline'}>
              평일 (월, 화, 수, 목, 금)
            </Button>
            <Button size={'md'} variant={'outline'}>
              주말 (토, 일)
            </Button>
            <Button size={'md'} variant={'outline'}>
              주7일 (월~일)
            </Button>
            <Button size={'md'} variant={'outline'}>
              주6일
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-y-3">
          <div className="flex items-center gap-x-2">
            <div className="border-gray3 h-[20px] w-[20px] rounded-full border-[1.6px]" />
            <p className="kr-button text-gray5">직접선택</p>
          </div>
          <div className="flex gap-x-3">
            <Button size={'md'} variant={'outline'}>
              월요일
            </Button>
            <Button size={'md'} variant={'outline'}>
              화요일
            </Button>
            <Button size={'md'} variant={'outline'}>
              수요일
            </Button>
            <Button size={'md'} variant={'outline'}>
              목요일
            </Button>
            <Button size={'md'} variant={'outline'}>
              금요일
            </Button>
            <Button size={'md'} variant={'outline'}>
              토요일
            </Button>
            <Button size={'md'} variant={'outline'}>
              일요일
            </Button>
          </div>
        </div>

        <div className="flex gap-x-2">
          <div className="border-gray3 h-[20px] w-[20px] rounded-full border-[1.6px]" />
          <div className="mt-1 flex w-full flex-col gap-y-1">
            <div className="kr-button text-gray5">기타사항</div>
            <TextInput value={''} onChange={(e) => {}} placeholder={'기타 근무요일을 입력해주세요.'} />
          </div>
        </div>
      </div>
    </div>
  )
}
