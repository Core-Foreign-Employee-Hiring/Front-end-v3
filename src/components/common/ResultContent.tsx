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

  const formattedAnalysis = useMemo(() => {
    if (!analysis) return ''

    // 1. '---' 기호를 기준으로 섹션을 나눕니다.
    const sections = analysis.split('---')

    return sections
      .map((section, index) => {
        const trimmedSection = section.trim()

        // 첫 번째 섹션(종합평가)은 그대로 두고, 두 번째 섹션부터 들여쓰기를 적용합니다.
        if (index > 0) {
          return trimmedSection
            .split('\n')
            .map((line) => `        ${line.trim()}`) // 두 번 이상의 들여쓰기 (공백 8칸)
            .join('\n')
        }

        // 첫 섹션 내의 마침표 줄바꿈 처리
        return trimmedSection.replace(/(?<!\d)\.\s+/g, '.\n')
      })
      .join('\n\n') // --- 대신 여백(줄바꿈 두 번)으로 구분
      .trim()
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
