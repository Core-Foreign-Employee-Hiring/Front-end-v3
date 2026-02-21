'use client'

import ManualItem from '@/components/interview/home/ManualItem'
import { Label } from '@/components/common'
import { useTranslation } from 'react-i18next'

// 데이터 타입을 정의하여 자동 완성을 돕습니다.
interface ManualItemType {
  number: number
  title: string
  content: string
}

export default function Manual() {
  // 'interview' 네임스페이스를 사용
  const { t } = useTranslation('interview')

  const manualItems = t('home.manual.items', { returnObjects: true })

  const items = Array.isArray(manualItems) ? (manualItems as ManualItemType[]) : []

  return (
    <section>
      <Label label={t('home.manual.title')} type={'subtitleLg'} />

      <div className="desktop:grid-cols-2 tablet:grid-cols-2 grid grid-cols-1 gap-[20px]">
        {items.map((item) => (
          <ManualItem key={item.number} number={item.number} title={item.title} content={item.content} />
        ))}
      </div>
    </section>
  )
}
