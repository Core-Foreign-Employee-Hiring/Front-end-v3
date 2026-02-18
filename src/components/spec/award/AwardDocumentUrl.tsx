'use client'

import { Button, Label, Spacing, UploadItem } from '@/components/common'
import { UploadIcon } from '@/assets/svgComponents'
import { useRef } from 'react'
import { SpecAwardType } from '@/types/spec'

interface AwardDocumentUrlProps {
  index: number
  award: SpecAwardType
  handleAwardChange: (
    index: number,
    fieldName: 'awardName' | 'host' | 'acquiredDate' | 'description' | 'documentUrl',
    value: string | File | null
  ) => void
}

export default function AwardDocumentUrl({ index, award, handleAwardChange }: AwardDocumentUrlProps) {
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
      <UploadItem file={award.documentUrl} onRemove={handleRemoveFile} />
      <Spacing height={8} />
      <Button
        onClick={handleUploadClick}
        leftIcon={<UploadIcon width={20} height={20} />}
        variant={'ghost'}
        size={'sm'}
        state={'default'}
        customClassName={'w-[96px]'}
      >
        업로드
      </Button>
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
    </div>
  )
}
