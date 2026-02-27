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

  // 1. useMemo 내에서 URL을 생성합니다. (렌더링 도중 계산)
  // Store에 파일이 있으면 다시 돌아와도 동일한 파일 객체로부터 URL이 생성됩니다.
  const previewUrl = useMemo(() => {
    if (!resumeProfileFile) return null
    return URL.createObjectURL(resumeProfileFile)
  }, [resumeProfileFile])

  // 2. useEffect는 오직 생성된 URL의 '메모리 해제'만 담당합니다.
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl]) // previewUrl이 바뀔 때 이전 URL을 정리(cleanup)합니다.

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
    <div className="w-[184px]">
      <Label label={t('create_resume.body.info.profile_image_uploader.label')} type={'titleSm'} isRequired={true} />
      <Spacing height={8} />

      {previewUrl ? (
        <>
          <div className="relative h-[240px] w-[184px] overflow-hidden rounded-[8px] bg-gray-100">
            <Image fill alt={'프로필'} src={previewUrl} className={'object-cover'} unoptimized />
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
