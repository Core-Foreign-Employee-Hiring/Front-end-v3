import { fetchInterviewAnswerNoteDetail } from '@/lib/server/interview'
import { ResponseCreateNewNoteType } from '@/types/interview/note'
import NoteHeaderOption from '@/components/interview/note/NoteHeaderOption'
import AuthWatcher from '@/components/auth/AuthWatcher'
import PageLayout from '@/components/common/PageLayout'
import Spacing from '@/components/common/Spacing'
import Label from '@/components/common/Label'
import InterviewHeader from '@/components/interview/InterviewHeader'
import DetailedFeedbackItem from '@/components/interview/result/DetailedFeedbackItem'

interface InterviewNoteDetailPageProps {
  params: Promise<{ noteId: string }>
}
export default async function InterviewNoteDetailPage({ params }: InterviewNoteDetailPageProps) {
  const { noteId } = await params
  const result = await fetchInterviewAnswerNoteDetail(noteId)
  const noteData = result.data as ResponseCreateNewNoteType

  if (!result.success) {
    return <AuthWatcher results={[result]} />
  }

  return (
    <main>
      <InterviewHeader
        leftElement={<Label label={noteData?.title || ''} type={'titleMd'} />}
        rightElement={<NoteHeaderOption noteId={noteId} />}
      />
      <PageLayout>
        <Spacing height={20} />
        <div className="flex w-full flex-col gap-y-[20px]">
          {noteData?.entries.map((entry, index) => (
            <DetailedFeedbackItem
              key={entry.id}
              questionId={entry.question}
              followUpQuestion={entry.follow_up_question}
              followUpAnswer={entry.follow_up_answer}
              feedback={entry.feedback}
              questionOrder={index + 1}
              question={entry.question}
              userAnswer={entry.initial_answer}
              improvements={entry.improvements}
              noteId={noteId}
              entryId={entry.id}
              finalAnswer={entry.final_answer}
              isFinalElement={true}
              // headerRightElement={<DeleteEntryButton />}
            />
          ))}
        </div>
      </PageLayout>
    </main>
  )
}
