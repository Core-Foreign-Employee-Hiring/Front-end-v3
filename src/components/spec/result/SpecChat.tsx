'use client'

import { ResponsiveRadar } from '@nivo/radar'
import { SpecResultType } from '@/types/spec'
import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'

interface ChatProps {
  specResult: SpecResultType | undefined
  customClassname?: string
}

export default function SpecChat({ specResult, customClassname }: ChatProps) {
  const { t } = useTranslation(['spec'])
  const data = [
    { label: t('result.chat.experience'), value: specResult?.experience },
    { label: t('result.chat.certificate'), value: specResult?.certificate },
    { label: t('result.chat.language'), value: specResult?.language },
    { label: t('result.chat.career'), value: specResult?.career },
    { label: t('result.chat.education'), value: specResult?.education },
  ]
  return (
    <div
      className={twMerge(
        'desktop:w-[486px] desktop:h-[433px] v h-[286px] w-[321px] flex-shrink-0 whitespace-nowrap',
        customClassname
      )}
    >
      <ResponsiveRadar
        data={data}
        keys={['value']}
        colors={['#3B3DFF']}
        indexBy="label"
        maxValue={100}
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
