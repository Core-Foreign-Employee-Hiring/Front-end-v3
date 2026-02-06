'use client'

import { Label, TextInput } from '@/components/common'
import { useCreateJobPostStore } from '@/store/createJobPostStore'

export default function Title() {
  const { updateCreateJobPost, createJobPost } = useCreateJobPostStore((state) => state)

  return (
    <div className="flex flex-col gap-y-2">
      <Label label={'공고 제목'} type={'titleSm'} isRequired={true} />
      <TextInput
        placeholder={'공고 제목을 작성해주세요.'}
        value={createJobPost.title ?? ''}
        onChange={(e) => {
          updateCreateJobPost('title', e.target.value)
        }}
      />
    </div>
  )
}
