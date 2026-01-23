import { fetchInterviewSets } from '@/lib/server/interview'
import HistoryItem from '@/components/interview/history/HistoryItem'

export default async function InterviewHistory() {
  const result = await fetchInterviewSets()

  return (
    <div className="grid grid-cols-3 gap-6">
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
