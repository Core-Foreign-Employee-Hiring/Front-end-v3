'use client'

import { Label, TextInput } from '@/components/common'
import { useCreateJobPostStore } from '@/store/createJobPostStore'

export default function CompanyName() {
  const { updateCreateJobPost, createJobPost } = useCreateJobPostStore((state) => state)

  return (
    <div className="flex flex-col gap-y-2">
      <Label label={'회사명'} isRequired={true} type={'titleSm'} />
      <TextInput
        onChange={(e) => {
          updateCreateJobPost('companyName', e.target.value)
        }}
        value={createJobPost.companyName ?? ''}
        placeholder={'회사명을 입력해주세요.'}
      />
    </div>
  )
}
