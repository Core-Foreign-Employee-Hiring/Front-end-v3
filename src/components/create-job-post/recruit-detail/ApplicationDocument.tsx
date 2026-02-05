'use client'

import { Button, Label, TextInput } from '@/components/common'

export default function ApplicationDocument() {
  return (
    <div className="flex flex-col gap-y-2">
      <Label label={'제출서류'} isOption={true} type={'titleSm'} />
      <div className="flex gap-x-3">
        <Button size={'md'} variant={'outline'}>
          이력서
        </Button>
        <Button size={'md'} variant={'outline'}>
          자기소개서
        </Button>
        <Button size={'md'} variant={'outline'}>
          포트폴리오
        </Button>
        <Button size={'md'} variant={'outline'}>
          경력기술서
        </Button>
        <Button size={'md'} variant={'outline'}>
          기타
        </Button>
      </div>
      <div className="flex items-center gap-x-3">
        <div className="kr-subtitle-sm text-gray5">기타사항</div>
        <TextInput value={''} onChange={(e) => {}} placeholder={'기타 제출서류를 입력해주세요.'}></TextInput>
      </div>
    </div>
  )
}
