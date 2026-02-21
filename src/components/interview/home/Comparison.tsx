'use client'

import { Label } from '@/components/common'
import ComparisonItem from '@/components/interview/home/ComparisonItem'
import { AudioIcon, LineChartIcon, NoteIcon, PaperClipIcon } from '@/assets/svgComponents'
import { useTranslation } from 'react-i18next'

interface ComparisonItemType {
  title: string
  content: string
}

export default function Comparison() {
  const { t } = useTranslation('interview')

  const comparisonData = t('home.comparison.items', { returnObjects: true })
  const items = Array.isArray(comparisonData) ? (comparisonData as ComparisonItemType[]) : []

  const icons = [
    <PaperClipIcon key="icon-1" width={22} height={32} />,
    <LineChartIcon key="icon-2" width={32} height={23} />,
    <NoteIcon key="icon-3" width={32} height={26} />,
    <AudioIcon key="icon-4" width={26} height={32} />,
  ]

  return (
    <section className="flex flex-col gap-y-3">
      <Label type={'subtitleLg'} label={t('home.comparison.title')} />

      <div className="desktop:grid-cols-2 tablet:grid-cols-2 grid grid-cols-1 gap-6">
        {items.map((item, index) => (
          <ComparisonItem
            key={index}
            title={item.title}
            content={item.content}
            icon={icons[index]} // 인덱스에 맞춰 아이콘 매칭
          />
        ))}
      </div>
    </section>
  )
}
