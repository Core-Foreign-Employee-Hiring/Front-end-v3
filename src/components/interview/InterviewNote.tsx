import { fetchInterviewAnswerNotes } from '@/lib/server/interview'
import NoteItem from '@/components/interview/note/NoteItem'

export default async function InterviewNote() {
  const result = await fetchInterviewAnswerNotes()
  console.log('result', result)
  const notes = result.data

  return (
    <div className="tablet:grid-cols-2 desktop:grid-cols-2 grid grid-cols-1 gap-6">
      {notes?.map((note) => (
        <NoteItem
          noteId={note.id}
          status={'PENDING'}
          content={`${note.entries_count}개`}
          key={note.id}
          title={note.title}
        />
      ))}
    </div>
  )
}
