import { Badge, Spacing } from '@/components/common'

interface DetailedFeedbackMyAnswerProps {
  userAnswer: string
  followUpQuestion: string | null
  followUpAnswer: string | null
}

export default function DetailedFeedbackMyAnswer({
  userAnswer,
  followUpAnswer,
  followUpQuestion,
}: DetailedFeedbackMyAnswerProps) {
  return (
    <div className="bg-gray1 w-full rounded-[12px] p-4">
      <section>
        <Badge textColor={'text-white'} bgColor={'bg-main-300'}>
          나의 답변
        </Badge>
        <Spacing height={12} />

        <p className="kr-body-md">{userAnswer}</p>
      </section>
      <Spacing height={20} />

      {followUpQuestion && (
        <section className="rounded-[8px] bg-white p-[12px]">
          <Badge textColor={'text-error'} bgColor={'bg-error-light'}>
            압박 질문
          </Badge>
          <Spacing height={12} />

          <p className="kr-body-md">{followUpQuestion}</p>
          <Spacing height={12} />

          <div className="border-gray5 border-l-[2px] pl-[12px]">{followUpAnswer}</div>
        </section>
      )}
    </div>
  )
}
