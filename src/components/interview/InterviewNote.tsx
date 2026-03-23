import { fetchInterviewAnswerNotes } from '@/lib/server/interview'
import NoteItem from '@/components/interview/note/NoteItem'
import AuthWatcher from '@/components/auth/AuthWatcher'
import { AnswerNoteType } from '@/types/interview/note'
import { getTranslationServer } from '@/lib/i18n'
import { Locale } from '@/lib/i18n.types'
import EmptyState from '@/components/common/EmptyState' // EmptyState 컴포넌트 임포트

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
  const hasNotes = notes && notes.length > 0

  // 데이터가 없을 때 표시할 화면
  if (!hasNotes) {
    return (
      <EmptyState
        icon="📁"
        title={t('note.empty.title') || '저장된 면접 노트가 없습니다'}
        description={t('note.empty.description') || '나만의 면접 답변을 기록하고\n성공적인 취업을 준비해 보세요!'}
      />
    )
  }

  // 데이터가 있을 때 표시할 목록 (Grid)
  return (
    <div className="tablet:grid-cols-2 desktop:grid-cols-2 grid grid-cols-1 gap-6">
      {notes.map((note) => (
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
