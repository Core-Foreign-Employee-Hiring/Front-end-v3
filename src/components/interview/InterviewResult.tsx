'use client'

import { InterviewResultChat, InterviewResultHeader } from '@/components/interview'

interface InterviewResultProps {
  logic: number | undefined
  evidence: number | undefined
  job_understanding: number | undefined
  formality: number | undefined
  completeness: number | undefined
}

export default function InterviewResult({
  logic,
  completeness,
  evidence,
  formality,
  job_understanding,
}: InterviewResultProps) {
  const calculateAverage = (scores: {
    logic: number | undefined
    evidence: number | undefined
    job_understanding: number | undefined
    formality: number | undefined
    completeness: number | undefined
  }): number => {
    const { logic = 0, evidence = 0, job_understanding = 0, formality = 0, completeness = 0 } = scores

    const total = logic + evidence + job_understanding + formality + completeness
    const average = total / 5

    // 소수점 첫째 자리까지 반올림 (선택 사항)
    return Math.round(average * 10) / 10
  }

  return (
    <div className="">
      <InterviewResultHeader
        score={calculateAverage({ logic, evidence, job_understanding, formality, completeness })}
      />
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
