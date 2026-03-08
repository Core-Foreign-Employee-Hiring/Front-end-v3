import SpecChat from '@/components/spec/result/SpecChat'
import { ResultContent } from '@/components/common'
import { SpecResultType } from '@/types/spec'

interface RecentSpecResultBodyProps {
  specResult: SpecResultType | undefined
}

export default function ResultSpecResultBody({ specResult }: RecentSpecResultBodyProps) {
  return (
    <div className="flex gap-x-[24px]">
      <SpecChat specResult={specResult} customClassname={'desktop:w-[319px] desktop:h-[280px]'} />
      <ResultContent analysis={specResult?.analysis} />
    </div>
  )
}
