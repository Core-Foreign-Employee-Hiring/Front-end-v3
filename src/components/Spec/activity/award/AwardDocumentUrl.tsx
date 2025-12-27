'use client'

import { Button, Label, Spacing, UploadItem } from '@/components/common'
import { UploadIcon } from '@/assets/svgComponents'
import { useRef } from 'react'
import { SpecAwardType } from '@/types/spec'

interface AwardDocumentUrlProps {
  index: number
  activity: SpecAwardType
  documentURL: string | null | File
  onUpdate: (index: number, newData: SpecAwardType) => void
}

export default function AwardDocumentUrl({ index, activity, documentURL, onUpdate }: AwardDocumentUrlProps) {
  // 공통 변경 핸들러: 기존 activity를 복사하고 특정 필드만 업데이트
  const handleAwardChange = (index: number, fieldName: keyof SpecAwardType, value: string | number | File | null) => {
    onUpdate(index, {
      ...activity,
      [fieldName]: value,
    })
  }
  const fileInputRef = useRef<HTMLInputElement>(null)
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleAwardChange(index, 'documentUrl', file)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemoveFile = () => {
    handleAwardChange(index, 'documentUrl', null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div>
      <Label type={'inputLabel'} label={'증빙 자료'} className={'kr-title-sm text-gray5'} />
      <Spacing height={8} />
      <UploadItem file={documentURL} onRemove={handleRemoveFile} />
      <Spacing height={8} />
      <Button
        onClick={handleUploadClick}
        leftIcon={<UploadIcon width={20} height={20} />}
        variant={'ghost'}
        size={'sm'}
        state={'default'}
        customClassName={'w-[92px]'}
      >
        업로드
      </Button>
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
    </div>
  )
}
