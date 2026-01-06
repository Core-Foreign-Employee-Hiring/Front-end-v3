import { InterviewResultChat, InterviewResultHeader } from '@/components/interview'

interface InterviewResultProps {
  logic: number | undefined
  evidence: number | undefined
  job_understanding: number | undefined
  formality: number | undefined
  completeness: number | undefined
  overall_feedback: string | undefined
}

export default function InterviewResult({
  logic,
  completeness,
  overall_feedback,
  evidence,
  formality,
  job_understanding,
}: InterviewResultProps) {
  return (
    <div className="border-gray2 flex h-[495px] w-[486px] flex-shrink-0 flex-col gap-y-1 rounded-[12px] border p-5">
      <InterviewResultHeader score={80} />
      <InterviewResultChat
        logic={logic}
        job_understanding={job_understanding}
        formality={formality}
        evidence={evidence}
        completeness={completeness}
      />
    </div>
  )
}
