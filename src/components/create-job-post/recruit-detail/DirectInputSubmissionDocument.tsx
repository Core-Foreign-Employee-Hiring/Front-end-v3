'use client'

import { TextInput } from '@/components/common'
import { useCreateJobPostStore } from '@/store/createJobPostStore'

export default function DirectInputSubmissionDocument() {
  const { createJobPost, updateCreateJobPost } = useCreateJobPostStore((state) => state)

  return (
    <div className="flex items-center gap-x-3">
      <div className="kr-subtitle-sm text-gray5 shrink-0">기타사항</div>
      <TextInput
        value={createJobPost.directInputSubmissionDocument ?? ''}
        onChange={(e) => {
          updateCreateJobPost('directInputSubmissionDocument', e.target.value)
        }}
        placeholder={'기타 제출서류를 입력해주세요.'}
      />
    </div>
  )
}
