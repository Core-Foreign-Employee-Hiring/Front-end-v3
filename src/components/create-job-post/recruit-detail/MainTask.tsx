'use client'

import { Label, TextInput } from '@/components/common'
import { useCreateJobPostStore } from '@/store/createJobPostStore'

export default function MainTask() {
  const { updateCreateJobPost, createJobPost } = useCreateJobPostStore((state) => state)

  return (
    <div className="flex flex-col gap-y-2">
      <Label label={'주요 업무'} isRequired={true} />
      <TextInput
        textType={'textArea'}
        onChange={(e) => {
          updateCreateJobPost('mainTasks', e.target.value)
        }}
        value={createJobPost.mainTasks ?? ''}
        placeholder={'주요 업무를 구체적으로 입력해주세요.'}
      />
    </div>
  )
}
