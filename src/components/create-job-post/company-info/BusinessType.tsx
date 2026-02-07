'use client'

import { Label, TextInput } from '@/components/common'
import { useCreateJobPostStore } from '@/store/createJobPostStore'

export default function BusinessType() {
  const { createJobPost, updateCreateJobPost } = useCreateJobPostStore((state) => state)
  return (
    <div className="flex flex-col gap-y-2">
      <Label isOption={true} label={'업종'} />
      <TextInput
        placeholder={'업종을 입력해주세요.'}
        onChange={(e) => {
          updateCreateJobPost('businessType', e.target.value)
        }}
        value={createJobPost.businessType ?? ''}
      />
    </div>
  )
}
