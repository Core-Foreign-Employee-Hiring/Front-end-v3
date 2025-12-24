import Label from '@/components/common/Label'
import Button from '@/components/common/Button'
import { DeleteIcon } from '@/assets/svgComponents'
import Spacing from '@/components/common/Spacing'
import EduSchool from '@/components/Spec/education/EduSchool'
import EduDuration from '@/components/Spec/education/EduDuration'
import EduMajor from '@/components/Spec/education/EduMajor'
import EduGrades from '@/components/Spec/education/EduGrades'
import { Dispatch } from 'react'

interface AddEduFormProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export default function AddEduForm({ isOpen, setIsOpen }: AddEduFormProps) {
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
