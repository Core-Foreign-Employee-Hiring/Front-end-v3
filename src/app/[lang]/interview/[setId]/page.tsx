import { fetchInterviewResult } from '@/lib/server/interview'
import { InterviewResultType } from '@/types/interview'
import SaveNoteButton from '@/components/interview/result/SaveNoteButton'
import AuthWatcher from '@/components/auth/AuthWatcher'
import PageLayout from '@/components/common/PageLayout'
import ResultContent from '@/components/common/ResultContent'
import Spacing from '@/components/common/Spacing'
import InterviewHeader from '@/components/interview/InterviewHeader'
import ResultHeaderOption from '@/components/interview/result/HeaderOption'
import ResultHeaderTitle from '@/components/interview/result/HeaderTitle'
import InterviewResult from '@/components/interview/InterviewResult'
import DetailedFeedbackItem from '@/components/interview/result/DetailedFeedbackItem'

interface InterviewResultPageProps {
  params: Promise<{ setId: string }>
}

export default async function InterviewResultPage({ params }: InterviewResultPageProps) {
  const { setId } = await params
  const response = await fetchInterviewResult(setId)
  const interviewResult = response.data as InterviewResultType
  const evaluation = interviewResult.evaluation
  const set = interviewResult.set

  if (!response.success) {
    return <AuthWatcher results={[response]} />
  }

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
        <div className="tablet:flex-row desktop:flex-row flex flex-col items-center gap-x-[32px] gap-y-[16px]">
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
                  question={feedback.question}
                  userAnswer={feedback.user_answer}
                  followUpAnswer={feedback.follow_up_answer}
                  followUpQuestion={feedback.follow_up_question}
                  customClassName={'hidden desktop:block tablet:block'}
                />
              }
            />
          ))}
        </div>
      </PageLayout>
    </main>
  )
}
