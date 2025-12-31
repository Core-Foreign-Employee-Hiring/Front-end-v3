'use client'

import { Button, Spacing } from '@/components/common'
import { HistoryItemBody, HistoryItemHeader } from '@/components/interview'

interface HistoryItemProps {
  progress: 'IN_PROGRESS' | 'COMPLETED'
  title: string
}

export default function HistoryItem({ progress = 'IN_PROGRESS', title }: HistoryItemProps) {
  return (
    <div className="border-gray2 rounded-[12px] border bg-white p-5">
      <HistoryItemHeader title={title} progress={progress} />
      <Spacing height={8} />

      <HistoryItemBody job={'직무'} date={'2025.12.31'} count={'10개'} duration={'20분'} />
      <Spacing height={24} />

      <Button size={'lg'} variant={progress === 'COMPLETED' ? 'secondary' : 'primary'}>
        {progress === 'COMPLETED' ? '리포트보기' : '이어서 진행하기'}
      </Button>
    </div>
  )
}
