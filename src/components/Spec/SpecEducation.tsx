'use client'

import { Main5000PlusIcon } from '@/assets/svgComponents'
import { Button, Label, Spacing } from '../common'
import { AddEduForm, BottomButton } from '@/components/spec/index'
import { useSpecEducation } from '@/hooks'

export default function SpecEducation() {
  const { education, handleAddEducation, handleNextStep, isActive } = useSpecEducation()

  return (
    <div>
      <Label
        label={'학력 정보'}
        type={'titleMd'}
        rightElement={
          <Button
            onClick={handleAddEducation}
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

      {education && <AddEduForm />}

      <Spacing height={100} />
      <BottomButton isNextButtonActive={isActive} handleNext={handleNextStep} />
    </div>
  )
}
