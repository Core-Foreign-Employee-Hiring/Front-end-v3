'use client'

import { Button, Label, Spacing } from '@/components/common'
import { Main5000PlusIcon } from '@/assets/svgComponents'
import { AddActivityForm, BottomButton } from '@/components/spec/index'
import { useSpecActivity } from '@/hooks'

export default function SpecActivity() {
  const {
    handleUpdateActivity,
    handleRemoveActivity,
    specActivities,
    handlePrev,
    handleAddActivities,
    isActive,
    handleSubmit,
  } = useSpecActivity()

  return (
    <>
      <Label
        label={'수상 및 기타 경험'}
        type={'titleMd'}
        rightElement={
          <Button
            onClick={handleAddActivities}
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

      {specActivities.map((activity, index) => (
        <AddActivityForm
          key={index}
          index={index}
          activity={activity}
          onUpdate={handleUpdateActivity}
          onRemove={handleRemoveActivity}
        />
      ))}

      <Spacing height={100} />
      <BottomButton
        step={'5'}
        handlePrev={handlePrev}
        isNextButtonActive={isActive}
        handleNext={() => {
          handleSubmit()
        }}
      />
    </>
  )
}
