'use client'

import { useRef } from 'react'
import { Button, Label, Spacing, UploadItem } from '@/components/common'
import { UploadIcon } from '@/assets/svgComponents'

interface CertDocumentURLProps {
  index: number
  documentURL: string | null | File
  handleCertificationChange: (
    index: number,
    fieldName: 'certificationName' | 'documentUrl' | 'acquiredDate',
    value: string | File | null
  ) => void
}
export default function CertDocumentURL({ index, documentURL, handleCertificationChange }: CertDocumentURLProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleCertificationChange(index, 'documentUrl', file)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemoveFile = () => {
    handleCertificationChange(index, 'documentUrl', null)
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
        customClassName={'w-[96px]'}
      >
        업로드
      </Button>
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
    </div>
  )
}
