'use client'

import { Label, Spacing } from '@/components/common'
import { useTranslation } from 'react-i18next'

interface InterviewResultHeaderProps {
  score: number
}

export default function InterviewResultHeader({ score }: InterviewResultHeaderProps) {
  const { t } = useTranslation('interview')

  const getStrictEvaluation = (score: number) => {
    // i18n 키값과 컬러만 매핑
    if (score >= 98) return { key: 'top_1', color: '#1D4ED8' }
    if (score >= 94) return { key: 'top_10', color: '#3B3DFF' }
    if (score >= 85) return { key: 'top_25', color: '#2DD4BF' }
    if (score >= 70) return { key: 'mid', color: '#FACC15' }
    if (score >= 50) return { key: 'bottom_30', color: '#FB923C' }
    return { key: 'bottom_10', color: '#FF4D4F' }
  }

  const { key, color } = getStrictEvaluation(score)

  // JSON에서 라벨과 텍스트를 불러옴
  const evaluationLabel = t(`history.setDetail.header.evaluations.${key}.label`)
  const evaluationText = t(`history.setDetail.header.evaluations.${key}.text`)

  return (
    <div>
      <Label label={t('history.setDetail.header.total_score_label')} labelColor={'text-gray5'} type={'button'} />
      <Spacing height={12} />
      <div className="flex items-end justify-between">
        <div className="flex items-end gap-x-1">
          <h4 className="kr-title-md">
            {score}
            {t('history.setDetail.header.score_unit')}
          </h4>
          <p className="kr-subtitle-md text-gray4">/</p>
          <p className="kr-subtitle-md text-gray4">100{t('history.setDetail.header.score_unit')}</p>
        </div>

        <p className="kr-title-sm" style={{ color }}>
          {`${evaluationLabel}, ${evaluationText}`}
        </p>
      </div>
    </div>
  )
}
