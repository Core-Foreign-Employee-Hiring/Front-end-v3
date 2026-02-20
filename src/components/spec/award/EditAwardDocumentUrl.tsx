'use client'

import { SpecAwardType } from '@/types/spec'
import { useRef } from 'react'
import { Button, Label, Spacing, UploadItem } from '@/components/common'
import { UploadIcon } from '@/assets/svgComponents'
import { useTranslation } from 'react-i18next'

interface EditAwardDocumentUrlProps {
  editAward: SpecAwardType
  handleAwardChange: (
    fieldName: 'awardName' | 'host' | 'acquiredDate' | 'description' | 'documentUrl',
    value: string | File | null
  ) => void
}
export default function EditAwardDocumentUrl({ editAward, handleAwardChange }: EditAwardDocumentUrlProps) {
  const { t } = useTranslation(['spec'])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleAwardChange('documentUrl', file)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemoveFile = () => {
    handleAwardChange('documentUrl', null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div>
      <Label type={'inputLabel'} label={t('award.form.documentUrl.title')} className={'kr-title-sm text-gray5'} />
      <Spacing height={8} />
      <UploadItem file={editAward.documentUrl} onRemove={handleRemoveFile} />
      <Spacing height={8} />
      <Button
        onClick={handleUploadClick}
        leftIcon={<UploadIcon width={20} height={20} />}
        variant={'ghost'}
        size={'sm'}
        state={'default'}
        customClassName={'w-[96px]'}
      >
        {t('award.form.documentUrl.button')}
      </Button>
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
    </div>
  )
}
