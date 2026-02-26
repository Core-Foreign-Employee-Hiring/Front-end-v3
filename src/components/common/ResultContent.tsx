'use client'

import { Spacing } from '@/components/common'
import { DiamondIcon } from '@/assets/svgComponents'
import { ReactNode, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

interface ResultContentProps {
  topPercent?: number | undefined
  analysis: string | undefined
  bottomElement?: ReactNode
}

export default function ResultContent({ topPercent, analysis, bottomElement }: ResultContentProps) {
  const { t } = useTranslation(['spec'])

  // .을 기준으로 나누고 \n을 붙여주는 로직 (컴포넌트 리렌더링 최적화)
  const formattedAnalysis = useMemo(() => {
    if (!analysis) return ''
    // 1. 마침표(.) 뒤에 공백이 오는 패턴을 찾아 줄바꿈(\n)으로 대체합니다.
    // 2. trim()을 통해 앞뒤 공백을 제거합니다.
    return analysis.split('. ').join('.\n').trim()
  }, [analysis])

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

      {/* whitespace-pre-line 클래스를 추가해야 \n이 실제 줄바꿈으로 렌더링됩니다 */}
      <p className="text-main-800 kr-body-md leading-relaxed whitespace-pre-line">{formattedAnalysis}</p>

      {bottomElement && bottomElement}
    </div>
  )
}
