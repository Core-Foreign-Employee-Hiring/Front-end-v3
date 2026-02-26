'use client'

import { useEffect, useMemo, useRef } from 'react'
import { Button, Label, Spacing } from '@/components/common'
import Image from 'next/image'
import { UploadIcon } from '@/assets/svgComponents'
import { useResumeStore } from '@/store/resumeStore'
import { useTranslation } from 'react-i18next'

export default function ProfileImageUploader() {
  const { t } = useTranslation('modal')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const resumeProfileFile = useResumeStore((state) => state.resumeProfileFile)
  const setProfileFile = useResumeStore((state) => state.setProfileFile)

  const previewUrl = useMemo(() => {
    if (!resumeProfileFile) return null
    const url = URL.createObjectURL(resumeProfileFile)
    return url
  }, [resumeProfileFile])

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setProfileFile(file)
    }
  }

  return (
    <div>
      <Label label={t('create_resume.body.info.profile_image_uploader.label')} type={'titleSm'} isRequired={true} />
      <Spacing height={8} />

      {/* 이미지 미리보기 영역 */}
      {previewUrl ? (
        <>
          <div className="relative h-[240px] w-[184px] overflow-hidden rounded-[8px] bg-gray-100">
            <Image fill alt={'프로필'} src={previewUrl} className={'object-cover'} />
          </div>
          <Spacing height={8} />
        </>
      ) : null}

      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />

      <Button
        leftIcon={<UploadIcon width={20} height={20} />}
        size={'sm'}
        variant={'outline'}
        customClassName={'w-fit'}
        onClick={handleUploadClick}
      >
        {resumeProfileFile
          ? t('create_resume.body.info.profile_image_uploader.buttons.re_upload')
          : t('create_resume.body.info.profile_image_uploader.buttons.upload')}
      </Button>
    </div>
  )
}
