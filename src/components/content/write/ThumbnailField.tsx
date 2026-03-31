'use client'

import { useRef } from 'react'
import { Button } from '@/components/common'
import { UploadIcon } from '@/assets/svgComponents'
import { useCreateContentStore } from '@/store/contentStore'
import UploadFileItem from '@/components/common/UploadFileItem'

export default function ThumbnailField() {
  const { setThumbnailFile, thumbnailFile } = useCreateContentStore((state) => state)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setThumbnailFile(file)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemoveFile = () => {
    setThumbnailFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="flex flex-col gap-y-3">
      <p className="subtitle-lg flex gap-x-1">
        썸네일 <span className="text-main">*</span>
      </p>
      <Button
        size={'sm'}
        onClick={handleUploadClick}
        leftIcon={<UploadIcon width={20} height={20} />}
        variant={'outline'}
        customClassName={'h-[36px] w-fit pl-3 pr-4'}
      >
        이미지 업로드
      </Button>
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
      {thumbnailFile && <UploadFileItem file={thumbnailFile} onRemove={handleRemoveFile} />}
    </div>
  )
}
