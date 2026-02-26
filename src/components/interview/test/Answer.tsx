'use client'

interface AnswerProps {
  answer: string
}
export default function Answer({ answer }: AnswerProps) {
  return (
    <div className="flex w-full justify-end">
      <div className="kr-subtitle-md bg-main-300 w-fit rounded-l-[12px] rounded-r-[4px] rounded-b-[12px] p-4 text-white">
        {answer}
      </div>
    </div>
  )
}
