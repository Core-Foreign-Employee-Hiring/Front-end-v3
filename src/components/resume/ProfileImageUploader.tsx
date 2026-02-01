'use client'

import { useEffect, useMemo, useRef } from 'react'
import { Button, Label, Spacing } from '@/components/common'
import Image from 'next/image'
import { UploadIcon } from '@/assets/svgComponents'
import { useResumeStore } from '@/store/resumeStore'

export default function ProfileImageUploader() {
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
      <Label label={'사진'} type={'titleSm'} isRequired={true} />
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
        customClassName={resumeProfileFile ? 'w-[110px]' : 'w-[100px]'}
        onClick={handleUploadClick}
      >
        {resumeProfileFile ? '재업로드' : '업로드'}
      </Button>
    </div>
  )
}
