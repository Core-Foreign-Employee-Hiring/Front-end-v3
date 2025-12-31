'use client'

import { DeleteIcon } from '@/assets/svgComponents'
import { Button, Label, Spacing } from '@/components/common'
import { EduDuration, EduGrades, EduMajor, EduSchool } from '@/components/spec'
import { useSpecStore } from '@/store/specStore'

export default function AddEduForm() {
  const { removeEducation } = useSpecStore((state) => state)

  return (
    <>
      <Label
        label={'학력 내용'}
        type={'subtitleLg'}
        rightElement={
          <Button
            onClick={() => {
              removeEducation()
            }}
            leftIcon={<DeleteIcon width={20} height={20} />}
            customClassName={'w-fit'}
            variant={'outline'}
            size={'md'}
          >
            삭제
          </Button>
        }
      />
      <Spacing height={24} />

      <EduSchool />
      <Spacing height={24} />

      <EduDuration />
      <Spacing height={24} />

      <EduMajor />
      <Spacing height={24} />

      <EduGrades />
    </>
  )
}
