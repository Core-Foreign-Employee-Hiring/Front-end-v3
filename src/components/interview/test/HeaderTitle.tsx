'use client'

import { useInterviewStore } from '@/store/interview/interviewStore'

export default function HeaderTitle() {
  const settingInterviewOption = useInterviewStore((state) => state.settingInterviewOption)
  return (
    <div className="flex flex-col gap-y-1">
      <h1 className="kr-subtitle-lg">{settingInterviewOption.title}</h1>
    </div>
  )
}
