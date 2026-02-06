'use client'

import { TextInput } from '@/components/common'
import { useCreateJobPostStore } from '@/store/createJobPostStore'

export default function DirectInputSalaryType() {
  const { updateCreateJobPost, createJobPost } = useCreateJobPostStore((state) => state)

  return (
    <div className="flex items-center gap-x-2">
      <div className="kr-subtitle-sm text-gray5 shrink-0">기타사항</div>
      <TextInput
        value={createJobPost.directInputSalaryType ?? ''}
        onChange={(e) => {
          updateCreateJobPost('directInputSalaryType', e.target.value)
        }}
        placeholder={'급여 기타사항을 작성해주세요. (예: 면접 후 협의 또는 회사 내규에 따를 경우 등) '}
      />
    </div>
  )
}
