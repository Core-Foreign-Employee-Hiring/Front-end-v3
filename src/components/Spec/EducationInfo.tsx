'use client'

import Label from '@/components/common/Label'
import Button from '@/components/common/Button'
import { Main5000PlusIcon } from '@/assets/svgComponents'
import Spacing from '@/components/common/Spacing'
import { useState } from 'react'
import AddEduForm from '@/components/Spec/education/AddEduForm'

export default function EducationInfo() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <div>
      <Label
        label={'학력 정보'}
        className="kr-title-md"
        rightElement={
          <Button
            onClick={() => {
              setIsOpen(true)
            }}
            variant={'secondary'}
            size={'md'}
            customClassName={'w-fit'}
            leftIcon={<Main5000PlusIcon width={20} height={20} />}
          >
            추가
          </Button>
        }
      />
      <Spacing height={16} />

      {isOpen && <AddEduForm setIsOpen={setIsOpen} isOpen={isOpen} />}
    </div>
  )
}
