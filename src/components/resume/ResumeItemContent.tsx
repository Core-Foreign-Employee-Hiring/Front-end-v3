'use client'

import { Label } from '@/components/common'
import { useRouter } from 'next/navigation'
import { formatDate } from '@/utils/common'

interface ResumeItemContentProps {
  id: number
  title: string
  createdAt?: string
  modifiedAt?: string
}
export default function ResumeItemContent({ title, createdAt, modifiedAt, id }: ResumeItemContentProps) {
  const router = useRouter()

  //TODO: 템플릿 유형 선택 추가
  const onNavigate = () => {
    router.push(`/carrer/resume/${id}`)
  }

  return (
    <div onClick={onNavigate} className="flex flex-col gap-y-2">
      <Label type={'subtitleLg'} label={title} />
      <div className="flex gap-x-2">
        {modifiedAt !== createdAt ? (
          <p className="kr-body-sm text-gray5">수정일자</p>
        ) : (
          <p className="kr-body-sm text-gray5">생성일자</p>
        )}
        <p className="kr-body-sm text-gray5">|</p>
        {modifiedAt !== createdAt ? (
          <p className="kr-body-sm text-gray5">{formatDate(modifiedAt)}</p>
        ) : (
          <p className="kr-body-sm text-gray5">{formatDate(createdAt)}</p>
        )}
      </div>
    </div>
  )
}
