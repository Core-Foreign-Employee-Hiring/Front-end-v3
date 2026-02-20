'use client'

import { Spacing } from '@/components/common'
import { DiamondIcon } from '@/assets/svgComponents'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

interface ResultContentProps {
  topPercent?: number | undefined
  analysis: string | undefined
  bottomElement?: ReactNode
}

export default function ResultContent({ topPercent, analysis, bottomElement }: ResultContentProps) {
  const { t } = useTranslation(['spec'])
  return (
    <div className="bg-main-50 flex w-full flex-col rounded-[12px] p-5">
      <div className="flex gap-x-1">
        <DiamondIcon height={24} width={24} />
        <p className="kr-title-sm">KORFIT {t('result.overallEvaluation')}</p>
      </div>
      <Spacing height={20} />

      {topPercent && (
        <>
          <div className="kr-title-md flex gap-x-1">
            <p>{t('result.percentage')}</p>
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
