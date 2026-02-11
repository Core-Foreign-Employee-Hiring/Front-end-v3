import { PageLayout, ResultContent, Spacing } from '@/components/common'
import {
  DetailedFeedbackItem,
  InterviewHeader,
  InterviewResult,
  ResultHeaderOption,
  ResultHeaderTitle,
} from '@/components/interview'
import { fetchInterviewResult } from '@/lib/server/interview'
import SaveNoteButton from '@/components/interview/result/SaveNoteButton'

interface InterviewResultPageProps {
  params: Promise<{ setId: string }>
}

export default async function InterviewResultPage({ params }: InterviewResultPageProps) {
  const { setId } = await params
  const response = await fetchInterviewResult(setId)
  const evaluation = response.data?.evaluation
  const set = response.data?.set

  return (
    <main>
      <InterviewHeader
        leftElement={
          <ResultHeaderTitle
            title={set?.title}
            status={set?.status}
            level={set?.level}
            completed_at={set?.completed_at}
            created_at={set?.created_at}
            job_type={set?.job_type}
          />
        }
        rightElement={<ResultHeaderOption />}
      />
      <PageLayout>
        <div className="flex gap-x-[32px]">
          <InterviewResult
            completeness={evaluation?.completeness}
            evidence={evaluation?.evidence}
            formality={evaluation?.formality}
            job_understanding={evaluation?.job_understanding}
            logic={evaluation?.logic}
          />
          <ResultContent analysis={evaluation?.overall_feedback} />
        </div>
        <Spacing height={32} />
        <div className="flex w-full flex-col gap-y-[20px]">
          {evaluation?.detailed_feedback.map((feedback) => (
            <DetailedFeedbackItem
              key={feedback.question_order}
              questionId={feedback.question_id}
              followUpQuestion={feedback.follow_up_question}
              followUpAnswer={feedback.follow_up_answer}
              feedback={feedback.feedback}
              questionOrder={feedback.question_order}
              question={feedback.question}
              userAnswer={feedback.user_answer}
              improvements={feedback.improvements}
              isFinalElement={false}
              headerRightElement={
                <SaveNoteButton
                  feedback={feedback.feedback}
                  improvements={feedback.improvements}
                  questionId={feedback.question_id}
                  userAnswer={feedback.user_answer}
                  followUpAnswer={feedback.follow_up_answer}
                  followUpQuestion={feedback.follow_up_question}
                />
              }
            />
          ))}
        </div>
      </PageLayout>
    </main>
  )
}
