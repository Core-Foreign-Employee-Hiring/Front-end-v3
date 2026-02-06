'use client'

import { Label, TextInput } from '@/components/common'
import { useCreateJobPostStore } from '@/store/createJobPostStore'

export default function Qualification() {
  const { updateCreateJobPost, createJobPost } = useCreateJobPostStore((state) => state)

  return (
    <div className="flex flex-col gap-y-2">
      <Label label={'자격 요건'} isRequired={true} />
      <TextInput
        textType={'textArea'}
        onChange={(e) => {
          updateCreateJobPost('qualifications', e.target.value)
        }}
        value={createJobPost.qualifications ?? ''}
        placeholder={'해당 공고의 직무에서 필수로 요구되는 자격을 입력해주세요.'}
      />
    </div>
  )
}
