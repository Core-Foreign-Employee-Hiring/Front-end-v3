'use client'

import { Button } from '@/components/common'
import { Gray5OptionIcon } from '@/assets/svgComponents'
import { SpecEvaluationType } from '@/types/spec'
import { useRouter } from 'next/navigation'

interface ListItemProps extends SpecEvaluationType {
  isLast?: boolean
}

export default function ListItem({
  isLast,
  specEvaluationId,
  specName,
  evaluatedDate,
  summary,
  topPercent,
}: ListItemProps) {
  const router = useRouter()
  return (
    <div className={`${isLast ? '' : 'border-gray2 border-b'} flex h-[76px] items-center justify-between px-5 py-2`}>
      <div className="kr-subtitle-md flex w-[168px] shrink-0 items-center justify-center truncate">{specName}</div>
      <div className="kr-body-sm text-gray4 flex w-[84px] shrink-0 items-center justify-center">{evaluatedDate}</div>
      <div className="kr-badge-md flex w-[56px] shrink-0 items-center justify-center truncate">{topPercent}</div>
      <div className="kr-button text-gray4 flex w-[360px] shrink-0 items-center justify-center truncate">{summary}</div>
      <Button
        onClick={() => {
          router.push(`/carrer/${specEvaluationId}`)
        }}
        customClassName={'w-[100px]'}
        variant={'secondary'}
        size={'sm'}
      >
        상세보기
      </Button>
      <Gray5OptionIcon width={32} height={32} />
    </div>
  )
}
