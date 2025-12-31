'use client'

import { Button, Label, Spacing } from '@/components/common'
import { Main5000PlusIcon } from '@/assets/svgComponents'
import { AddCertForm, BottomButton } from '@/components/spec/index'
import { useSpecCertification } from '@/hooks'

export default function SpecCertification() {
  const { handleNext, handlePrev, handleAddCertification, certifications, isActive } = useSpecCertification()

  return (
    <div>
      <Label
        label={'자격증'}
        type={'titleMd'}
        rightElement={
          <Button
            onClick={handleAddCertification}
            variant={'secondary'}
            size={'md'}
            customClassName={'w-fit'}
            leftIcon={<Main5000PlusIcon width={20} height={20} />}
          >
            추가
          </Button>
        }
      />

      {certifications?.map((certification, index) => (
        <AddCertForm
          key={index}
          index={index}
          certificationName={certification.certificationName}
          acquiredDate={certification.acquiredDate}
          documentUrl={certification.documentUrl}
        />
      ))}

      <Spacing height={100} />
      <BottomButton handlePrev={handlePrev} isNextButtonActive={isActive} handleNext={handleNext} />
    </div>
  )
}
