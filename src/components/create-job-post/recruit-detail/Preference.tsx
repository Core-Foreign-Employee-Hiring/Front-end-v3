'use client'

import { Label, TextInput } from '@/components/common'
import { useCreateJobPostStore } from '@/store/createJobPostStore'

export default function Preference() {
  const { updateCreateJobPost, createJobPost } = useCreateJobPostStore((state) => state)

  return (
    <div className="flex flex-col gap-y-2">
      <Label label={'우대 사항'} isRequired={true} />
      <TextInput
        textType={'textArea'}
        onChange={(e) => {
          updateCreateJobPost('preferences', e.target.value)
        }}
        value={createJobPost.preferences ?? ''}
        placeholder={'보유 시 유리한 조건을 입력해주세요.'}
      />
    </div>
  )
}
