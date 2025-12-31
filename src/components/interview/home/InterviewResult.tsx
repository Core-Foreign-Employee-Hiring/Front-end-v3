import { InterviewResultChat, InterviewResultHeader } from '@/components/interview'

export default function InterviewResult() {
  return (
    <div className="border-gray2 flex h-[495px] w-[486px] flex-shrink-0 flex-col gap-y-1 rounded-[12px] border p-5">
      <InterviewResultHeader score={80} />
      <InterviewResultChat />
    </div>
  )
}
