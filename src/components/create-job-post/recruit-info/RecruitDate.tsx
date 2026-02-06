'use client'

import 'react-day-picker/dist/style.css' // 기본 스타일 필수
import { Label } from '@/components/common'
import RecruitStartDate from '@/components/create-job-post/recruit-info/RecruitStartDate'
import RecruitEndDate from '@/components/create-job-post/recruit-info/RecruitEndDate'

export default function RecruitDate() {
  return (
    <div className="flex flex-col gap-y-2">
      <Label label={'모집기간'} isRequired={true} type={'titleSm'} />

      <div className="relative flex items-center gap-x-3">
        <RecruitStartDate />
        <p className="kr-body-md text-gray4">~</p>
        <RecruitEndDate />
      </div>
      {/*<DirectInputRecruitDate />*/}
    </div>
  )
}
