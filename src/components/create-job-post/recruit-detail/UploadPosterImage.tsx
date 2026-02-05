'use client'

import { Label } from '@/components/common'

export default function UploadPosterImage() {
  return (
    <div className="flex flex-col gap-y-2">
      <Label label={'채용 포스터 업로드'} isOption={true} />
      {/*<Button></Button>*/}
    </div>
  )
}
