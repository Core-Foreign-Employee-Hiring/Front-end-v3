'use client'

import { Button, Label } from '@/components/common'
import UploadItem from '../../common/UploadItem'
import { useRef } from 'react'
import { useCreateJobPostStore } from '@/store/createJobPostStore'
import { UploadIcon } from '@/assets/svgComponents'

export default function UploadPosterImage() {
  const { updateCreateJobPost, createJobPost } = useCreateJobPostStore((state) => state)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      updateCreateJobPost('posterImageUrl', file)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemoveFile = () => {
    updateCreateJobPost('posterImageUrl', null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="flex flex-col gap-y-2">
      <Label label={'채용 포스터 업로드'} isOption={true} />
      <Button
        onClick={handleUploadClick}
        leftIcon={<UploadIcon width={20} height={20} />}
        variant={'outline'}
        size={'sm'}
        customClassName={'w-[165px]'}
      >
        채용 포스터 업로드
      </Button>
      <UploadItem file={createJobPost.posterImageUrl} onRemove={handleRemoveFile} />

      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
    </div>
  )
}
