'use client'

import { Dispatch, SetStateAction, useEffect } from 'react'
import { DeleteIcon } from '@/assets/svgComponents'
import { Button, Label, Spacing } from '@/components/common'
import { EduDuration, EduGrades, EduMajor, EduSchool } from '@/components/spec'
import { useSpecStore } from '@/store/specStore'

interface AddEduFormProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export default function AddEduForm({ isOpen, setIsOpen }: AddEduFormProps) {
  const education = useSpecStore((state) => state.spec.education)

  useEffect(() => {
    console.log('education', education)
  }, [education])

  return (
    <>
      <Label
        label={'학력 내용'}
        className="kr-subtitle-lg"
        rightElement={
          <Button
            onClick={() => {
              setIsOpen(false)
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
