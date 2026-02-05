'use client'

import { Label, TextInput } from '@/components/common'

export default function Title() {
  return (
    <div className="flex flex-col gap-y-2">
      <Label label={'공고 제목'} type={'titleSm'} isRequired={true} />
      <TextInput placeholder={'공고 제목을 작성해주세요.'} value={''} onChange={(e) => {}} />
    </div>
  )
}
