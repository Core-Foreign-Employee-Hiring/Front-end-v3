'use client'

import { Label, TextInput } from '@/components/common'
import { useCreateJobPostStore } from '@/store/createJobPostStore'
import SalaryType from '@/components/create-job-post/recruit-info/SalaryType'
import { SalaryEnumType } from '@/types/job-post'
import DirectInputSalaryType from '@/components/create-job-post/recruit-info/DirectInputSalaryType'

export default function Salary() {
  const { updateCreateJobPost, createJobPost } = useCreateJobPostStore((state) => state)

  const salaryTypeList: { content: string; key: SalaryEnumType }[] = [
    { content: '연봉', key: 'ANNUAL' },
    { content: '월급', key: 'MONTHLY' },
    { content: '주급', key: 'WEEKLY' },
    { content: '일급', key: 'DAILY' },
    { content: '시급', key: 'HOURLY' },
    { content: '기타', key: 'ETC' },
  ]

  return (
    <div className="flex flex-col gap-y-2">
      <Label isOption={true} label={'급여'} type={'titleSm'} />
      <div className="flex gap-x-3">
        <SalaryType salaryTypeList={salaryTypeList} />
        <TextInput
          rightElement={<p>원</p>}
          inputType={'number'}
          value={createJobPost.salary ?? ''}
          onChange={(e) => {
            updateCreateJobPost('salary', parseInt(e.target.value))
          }}
          placeholder={'급여를 입력해주세요.'}
        />
      </div>
      {createJobPost.salaryType === 'ETC' && <DirectInputSalaryType />}
    </div>
  )
}
