import CTAButtons from '@/components/spec/home/CTAButtons'
import SpecDiagnosticHistory from '@/components/spec/home/SpecDiagnosticHistory'
import CreateNewSpecButton from '@/components/spec/home/CreateNewSpecButton'
import Spacing from '@/components/common/Spacing'
import Label from '@/components/common/Label'
import { fetchAllSpecResult } from '@/lib/server/spec'
import NoSpecResult from '@/components/home/NoSpecResult'
import RecentSpecResult from '@/components/spec/home/RecentSpecResult'

export default async function SpecHome() {
  const result = await fetchAllSpecResult({ page: 0, size: 1 })
  console.log('내 스펙 평가 데이터', result.data?.content)
  return (
    <div>
      <Label label={'스펙 관리'} type={'titleMd'} rightElement={<CreateNewSpecButton />} />
      <Spacing height={12} />
      {result.data?.content.length === 0 ? (
        <NoSpecResult />
      ) : (
        <RecentSpecResult
          specEvaluationId={`${result.data?.content[0].specEvaluationId}`}
          evaluatedDate={result.data?.content[0].evaluatedDate}
          specName={result.data?.content[0].specName}
        />
      )}
      <Spacing height={24} />
      <CTAButtons />
      <Spacing height={40} />
      <SpecDiagnosticHistory />
    </div>
  )
}
