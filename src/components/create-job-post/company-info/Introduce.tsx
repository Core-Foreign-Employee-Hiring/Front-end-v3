'use client'

import { Label, TextInput } from '@/components/common'
import { useCreateJobPostStore } from '@/store/createJobPostStore'

export default function Introduce() {
  const { updateCreateJobPost, createJobPost } = useCreateJobPostStore((state) => state)
  return (
    <div className="flex flex-col gap-y-2">
      <Label isOption={true} label={'회사 소개'} />
      <TextInput
        placeholder={'회사 소개를 입력해주세요.'}
        onChange={(e) => {
          updateCreateJobPost('companyIntroduction', e.target.value)
        }}
        value={createJobPost.companyIntroduction ?? ''}
        textType={'textArea'}
      />
    </div>
  )
}
