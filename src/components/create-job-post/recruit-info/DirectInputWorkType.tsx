'use client'

import { TextInput } from '@/components/common'
import { useCreateJobPostStore } from '@/store/createJobPostStore'

export default function DirectInputWorkType() {
  const { updateCreateJobPost, createJobPost } = useCreateJobPostStore((state) => state)
  return (
    <div className="flex items-center gap-x-3">
      <div className="kr-subtitle-sm text-gray5 shrink-0">기타사항</div>
      <TextInput
        placeholder={'기타 근무형태를 입력해주세요.'}
        onChange={(e) => {
          updateCreateJobPost('directInputWorkType', e.target.value)
        }}
        value={createJobPost.directInputWorkType ?? ''}
      />
    </div>
  )
}
