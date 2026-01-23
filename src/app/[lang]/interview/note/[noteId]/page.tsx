import { DetailedFeedbackItem, InterviewHeader } from '@/components/interview'
import { Label, PageLayout, Spacing } from '@/components/common'
import NoteHeaderOption from '@/components/interview/note/NoteHeaderOption'
import { fetchInterviewAnswerNoteDetail } from '@/lib/server/interview'

interface InterviewNoteDetailPageProps {
  params: Promise<{ noteId: string }>
}
export default async function InterviewNoteDetailPage({ params }: InterviewNoteDetailPageProps) {
  const { noteId } = await params
  const result = await fetchInterviewAnswerNoteDetail(noteId)
  const noteData = result.data

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
              key={entry.question_id}
              questionId={entry.question_id}
              followUpQuestion={'압박질문인데 현호오빠가 추가해줘야 해요'}
              followUpAnswer={'압박질문에 대한 답변인데 현호오빠가 추가해줘야 해요'}
              feedback={entry.feedback}
              questionOrder={index + 1}
              question={'질문이 들어가야하는데 현호오빠가 추가해줘야 해요'}
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
