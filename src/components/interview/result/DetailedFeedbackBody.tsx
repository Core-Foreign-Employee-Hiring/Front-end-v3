import { Badge, ResultContent, Spacing } from '@/components/common'
import DetailedFeedbackMyAnswer from '@/components/interview/result/DetailedFeedbackMyAnswer'

interface DetailedFeedbackBodyProps {
  userAnswer: string
  followUpQuestion: string | null
  followUpAnswer: string | null
  feedback: string
  improvements: string
}

export default function DetailedFeedbackBody({
  userAnswer,
  followUpAnswer,
  followUpQuestion,
  feedback,
  improvements,
}: DetailedFeedbackBodyProps) {
  return (
    <>
      <Spacing height={20} />
      <section className="flex gap-x-[20px]">
        <DetailedFeedbackMyAnswer
          followUpAnswer={followUpAnswer}
          userAnswer={userAnswer}
          followUpQuestion={followUpQuestion}
        />
        <ResultContent
          analysis={feedback}
          bottomElement={
            <div className="mt-[20px] flex flex-col gap-y-[12px]">
              <Badge bgColor={'bg-main-500'} textColor={'text-white'}>
                개선 제안
              </Badge>
              <p className="kr-body-md">{improvements}</p>
            </div>
          }
        />
      </section>
    </>
  )
}
