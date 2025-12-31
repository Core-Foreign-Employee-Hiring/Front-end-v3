import HistoryItem from '@/components/interview/history/HistoryItem'

export default function InterviewHistory() {
  return (
    <div className="grid grid-cols-3 gap-6">
      <HistoryItem progress={'IN_PROGRESS'} title={'타이틀'} />
      <HistoryItem progress={'IN_PROGRESS'} title={'타이틀'} />
      <HistoryItem progress={'IN_PROGRESS'} title={'타이틀'} />
      <HistoryItem progress={'IN_PROGRESS'} />
      <HistoryItem progress={'IN_PROGRESS'} />
      <HistoryItem progress={'IN_PROGRESS'} />
      <HistoryItem progress={'COMPLETED'} />
      <HistoryItem progress={'COMPLETED'} />
      <HistoryItem progress={'COMPLETED'} />
      <HistoryItem progress={'COMPLETED'} />
      <HistoryItem progress={'COMPLETED'} />
      <HistoryItem progress={'COMPLETED'} />
    </div>
  )
}
