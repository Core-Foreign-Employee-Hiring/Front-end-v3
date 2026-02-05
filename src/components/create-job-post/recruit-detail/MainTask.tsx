'use client'

import { Label, TextInput } from '@/components/common'

export default function MainTask() {
  return (
    <div className="flex flex-col gap-y-2">
      <Label label={'주요 업무'} isRequired={true} />
      <TextInput
        textType={'textArea'}
        onChange={(e) => {}}
        value={''}
        placeholder={'주요 업무를 구체적으로 입력해주세요.'}
      />
    </div>
  )
}
