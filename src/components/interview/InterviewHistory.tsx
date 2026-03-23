import { fetchInterviewSets } from '@/lib/server/interview'
import HistoryItem from '@/components/interview/history/HistoryItem'
import { InterviewSetType } from '@/types/interview'
import AuthWatcher from '@/components/auth/AuthWatcher'
import EmptyState from '@/components/common/EmptyState' // EmptyState 임포트
import { getTranslationServer } from '@/lib/i18n'
import { Locale } from '@/lib/i18n.types'

interface InterviewHistoryProps {
  lang: Locale
}

export default async function InterviewHistory({ lang }: InterviewHistoryProps) {
  const { t } = await getTranslationServer(lang, 'interview')
  const result = await fetchInterviewSets()

  if (!result.success) {
    return <AuthWatcher results={[result]} />
  }

  const interviewSets = result.data as InterviewSetType[]
  const hasHistory = interviewSets && interviewSets.length > 0

  // 1. 데이터가 없을 때 표시할 화면 (Empty State)
  if (!hasHistory) {
    return (
      <EmptyState
        icon="📝" // 히스토리에 어울리는 아이콘으로 변경 가능
        title={t('history.empty.title') || '진행한 면접 내역이 없습니다'}
        description={t('history.empty.description') || 'AI 면접 연습을 시작하고\n실전 감각을 익혀보세요!'}
      />
    )
  }

  // 2. 데이터가 있을 때 표시할 목록
  return (
    <div className="desktop:grid-cols-3 desktop:gap-6 tablet:grid-cols-2 grid grid-cols-1 gap-4">
      {interviewSets.map((set) => (
        <HistoryItem
          id={set.id}
          level={set.level}
          createdAt={set.created_at}
          completedAt={set.completed_at}
          job={set.job_type}
          key={set.id}
          progress={set.status}
          title={set.title}
        />
      ))}
    </div>
  )
}
