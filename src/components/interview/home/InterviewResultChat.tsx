'use client'

import { ResponsiveRadar } from '@nivo/radar'
import { useTranslation } from 'react-i18next'

interface InterviewResultChatProps {
  logic: number | undefined
  evidence: number | undefined
  job_understanding: number | undefined
  formality: number | undefined
  completeness: number | undefined
}

export default function InterviewResultChat({
  logic,
  formality,
  completeness,
  job_understanding,
  evidence,
}: InterviewResultChatProps) {
  const { t } = useTranslation('interview')
  const data = [
    { label: t('history.setDetail.chat.logic'), value: logic },
    { label: t('history.setDetail.chat.evidence'), value: evidence },
    { label: t('history.setDetail.chat.job_understanding'), value: job_understanding },
    { label: t('history.setDetail.chat.formality'), value: formality },
    { label: t('history.setDetail.chat.completeness'), value: completeness },
  ]
  return (
    <div className="desktop:w-[319px] desktop:h-[280px] tablet:w-[319px] tablet:h-[280px] h-[294px] w-[335px] flex-shrink-0 whitespace-nowrap">
      <ResponsiveRadar
        data={data}
        keys={['value']}
        colors={['#3B3DFF']}
        maxValue={100}
        indexBy="label"
        gridShape="linear"
        dotBorderColor={{ theme: 'background' }}
        dotColor={{ theme: 'background' }}
        margin={{ top: 40, right: 60, bottom: 40, left: 60 }}
        borderColor={{ from: 'color' }}
        blendMode="multiply"
        motionConfig="wobbly"
      />
    </div>
  )
}
