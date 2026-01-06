import { Spacing } from '@/components/common'
import { DiamondIcon } from '@/assets/svgComponents'
import { ReactNode } from 'react'

interface ResultContentProps {
  topPercent?: number | undefined
  analysis: string | undefined
  name?: string | undefined
  bottomElement?: ReactNode
}

export default function ResultContent({ topPercent, analysis, name, bottomElement }: ResultContentProps) {
  return (
    <div className="bg-main-50 flex flex-col rounded-[12px] p-5">
      <div className="flex gap-x-1">
        <DiamondIcon height={24} width={24} />
        <p className="kr-title-sm">KORFIT 총평</p>
      </div>
      <Spacing height={20} />

      {topPercent && (
        <>
          <div className="kr-title-md flex gap-x-1">
            <p>{name}님은 상위</p>
            <p className="text-main-500">{topPercent}%</p>
          </div>
          <Spacing height={16} />
        </>
      )}

      <p className="text-main-800 kr-body-md">{analysis}</p>
      {bottomElement && bottomElement}
    </div>
  )
}
