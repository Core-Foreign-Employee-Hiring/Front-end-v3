'use client'

import { Label } from '@/components/common'
import { useState } from 'react'
import WorkDayTypeList from '@/components/create-job-post/recruit-info/WorkDayTypeList'
import WorkDayTypeDirect from '@/components/create-job-post/recruit-info/WorkDayTypeDirect'
import WorkDayTypeETC from '@/components/create-job-post/recruit-info/WorkDayTypeETC'

export default function WorkDayType() {
  const [type, setType] = useState<'LIST' | 'DIRECT' | 'ETC'>('LIST')

  return (
    <div className="flex flex-col gap-y-2">
      <Label label={'근무 요일'} isRequired={true} type={'titleSm'} />
      <div className="flex flex-col gap-y-[20px]">
        <WorkDayTypeList type={type} setType={setType} />
        <WorkDayTypeDirect type={type} setType={setType} />
        <WorkDayTypeETC type={type} setType={setType} />
      </div>
    </div>
  )
}
