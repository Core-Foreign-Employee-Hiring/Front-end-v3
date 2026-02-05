'use client'

import { Label } from '@/components/common'

export default function UploadCompanyLogoImage() {
  return (
    <div className="flex flex-col gap-y-2">
      <Label label={'회사 로고 업로드'} isOption={true} type={'titleSm'} />
    </div>
  )
}
