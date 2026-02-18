'use client'

import { ResponsiveRadar } from '@nivo/radar'

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
  const data = [
    { label: '논리성', value: logic },
    { label: '근거제시', value: evidence },
    { label: '직무이해', value: job_understanding },
    { label: '표현력', value: formality },
    { label: '완성도', value: completeness },
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
