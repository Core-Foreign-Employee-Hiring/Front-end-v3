import RecentSpecResultHeader from '@/components/spec/home/RecentSpecResultHeader'
import ResultSpecResultBody from '@/components/spec/home/RecentSpecResultBody'
import { fetchSpecResult } from '@/lib/server/spec'
import NoSpecResult from '@/components/home/NoSpecResult'

interface RecentSpecResultProps {
  specEvaluationId: string | undefined
  specName: string | undefined
  evaluatedDate: string | undefined
}
export default async function RecentSpecResult({ specEvaluationId, specName, evaluatedDate }: RecentSpecResultProps) {
  if (!specEvaluationId) return <NoSpecResult />

  const specResultResponse = await fetchSpecResult(specEvaluationId)
  const specResult = specResultResponse.data

  return (
    <div className="border-gray2 flex flex-col gap-y-[20px] rounded-[12px] border p-5">
      <RecentSpecResultHeader specName={specName} evaluatedDate={evaluatedDate} specEvaluationId={specEvaluationId} />
      <ResultSpecResultBody specResult={specResult} />
    </div>
  )
}
