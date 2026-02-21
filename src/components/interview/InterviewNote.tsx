import { fetchInterviewAnswerNotes } from '@/lib/server/interview'
import NoteItem from '@/components/interview/note/NoteItem'
import AuthWatcher from '@/components/auth/AuthWatcher'
import { AnswerNoteType } from '@/types/interview/note'
import { getTranslationServer } from '@/lib/i18n'
import { Locale } from '@/lib/i18n.types'

interface InterviewNoteProps {
  lang: Locale
}

export default async function InterviewNote({ lang }: InterviewNoteProps) {
  const { t } = await getTranslationServer(lang, 'interview')
  const result = await fetchInterviewAnswerNotes()

  if (!result.success) {
    return <AuthWatcher results={[result]} />
  }
  const notes = result.data as AnswerNoteType[]

  return (
    <div className="tablet:grid-cols-2 desktop:grid-cols-2 grid grid-cols-1 gap-6">
      {notes?.map((note) => (
        <NoteItem
          noteId={note.id}
          status={'PENDING'}
          content={`${note.entries_count} ${t('note.item.unit')}`}
          key={note.id}
          title={note.title}
        />
      ))}
    </div>
  )
}
