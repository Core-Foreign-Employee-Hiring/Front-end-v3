'use client'

import { Button, Label, Spacing } from '@/components/common'
import { Main5000PlusIcon } from '@/assets/svgComponents'
import { AddCareerForm, BottomButton } from '@/components/spec/index'
import { useSpecCareer } from '@/hooks'

export default function SpecCareer() {
  const { handleNext, handlePrev, handleAddCareer, careers, isActive } = useSpecCareer()

  return (
    <div>
      <Label
        label={'경력'}
        type={'titleMd'}
        rightElement={
          <Button
            onClick={handleAddCareer}
            variant={'secondary'}
            size={'md'}
            customClassName={'w-fit'}
            leftIcon={<Main5000PlusIcon width={20} height={20} />}
          >
            추가
          </Button>
        }
      />

      {careers?.map((career, index) => (
        <AddCareerForm
          key={index}
          index={index}
          companyName={career.companyName}
          position={career.position}
          startDate={career.startDate}
          endDate={career.endDate}
          contractType={career.contractType}
          highlight={career.highlight}
        />
      ))}

      <Spacing height={100} />
      <BottomButton handlePrev={handlePrev} isNextButtonActive={isActive} handleNext={handleNext} />
    </div>
  )
}
