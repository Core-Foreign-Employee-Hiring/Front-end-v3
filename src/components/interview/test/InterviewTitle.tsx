'use client'

import { Label, Spacing, TextInput } from '@/components/common'
import { useInterviewStore } from '@/store/interview/interviewStore'

export default function InterviewTitle() {
  const { setSettingInterviewOption, settingInterviewOption } = useInterviewStore((state) => state)

  return (
    <div>
      <Label label={'면접명'} type={'titleSm'} />
      <Spacing height={8} />
      <TextInput
        value={settingInterviewOption.title ?? ''}
        onChange={(e) => {
          setSettingInterviewOption({ title: e.target.value })
        }}
        status={'default'}
        placeholder={'면접 명을 입력해주세요.'}
      />
    </div>
  )
}
