'use client'

import { Badge, Button } from '@/components/common'
import { OptionIcon } from '@/assets/svgComponents'
import { useRouter } from 'next/navigation'

interface RecentSpecResultHeaderProps {
  specName: string | undefined
  evaluatedDate: string | undefined
  specEvaluationId: string | undefined
}

export default function RecentSpecResultHeader({
  specName,
  evaluatedDate,
  specEvaluationId,
}: RecentSpecResultHeaderProps) {
  const router = useRouter()

  return (
    <div className="flex items-center justify-between">
      <section className="flex items-center gap-x-2">
        <Badge>현재 진단</Badge>
        <h1 className="kr-subtitle-lg">{specName}</h1>
      </section>

      <section className="flex items-center gap-x-3">
        <div className="kr-body-sm text-gray4 flex items-center gap-x-2">
          <p>수정일자</p>
          <p>|</p>
          <p>{evaluatedDate}</p>
        </div>
        <Button
          onClick={() => {
            router.push(`/career/${specEvaluationId}`)
          }}
          size={'sm'}
          variant={'outline'}
          customClassName={'w-fit'}
        >
          스펙 보기
        </Button>
        <OptionIcon width={32} height={32} />
      </section>
    </div>
  )
}
