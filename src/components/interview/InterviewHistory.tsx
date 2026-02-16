import { fetchInterviewSets } from '@/lib/server/interview'
import HistoryItem from '@/components/interview/history/HistoryItem'
import AuthWatcher from '@/components/auth/AuthWatcher'

export default async function InterviewHistory() {
  const result = await fetchInterviewSets()

  return (
    <div className="desktop:grid-cols-3 desktop:gap-6 tablet:grid-cols-2 grid grid-cols-1 gap-4">
      <AuthWatcher results={[result]} />

      {result.data?.map((set) => (
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
