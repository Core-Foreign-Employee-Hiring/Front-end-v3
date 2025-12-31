'use client'

import { ResponsiveRadar } from '@nivo/radar'
import { SpecResultType } from '@/types/spec'

interface ChatProps {
  specResult: SpecResultType | undefined
}

export default function Chat({ specResult }: ChatProps) {
  const data = [
    { label: '경험', value: specResult?.experience },
    { label: '자격증', value: specResult?.certificate },
    { label: '어학', value: specResult?.language },
    { label: '경력', value: specResult?.career },
    { label: '학력', value: specResult?.education },
  ]
  return (
    <div className="desktop:w-[486px] desktop:h-[433px] h-[286px] w-[321px] flex-shrink-0 whitespace-nowrap">
      <ResponsiveRadar
        data={data}
        keys={['value']}
        colors={['#3B3DFF']}
        indexBy="label"
        maxValue="auto"
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
