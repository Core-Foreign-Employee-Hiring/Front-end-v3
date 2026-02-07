'use client'

import { Label, TextInput } from '@/components/common'
import { useCreateJobPostStore } from '@/store/createJobPostStore'

export default function WebSite() {
  const { updateCreateJobPost, createJobPost } = useCreateJobPostStore((state) => state)

  return (
    <div className="flex flex-col gap-y-2">
      <Label isOption={true} label={'웹사이트'} />
      <TextInput
        placeholder={'회사의 웹사이트를 입력해주세요.'}
        onChange={(e) => {
          updateCreateJobPost('websiteUrl', e.target.value)
        }}
        value={createJobPost.websiteUrl ?? ''}
      />
    </div>
  )
}
