'use client'

import { useState } from 'react'
import { Button, Label, Spacing, SwitchButton } from '@/components/common'
import { DeleteIcon } from '@/assets/svgComponents'
import { AddAwardForm, AddExperienceForm } from '@/components/spec'
import { SpecAwardType, SpecExperienceType } from '@/types/spec'

interface AddExperienceFormProps {
  index: number
  activity: SpecAwardType | SpecExperienceType
  onUpdate: (index: number, newData: SpecAwardType | SpecExperienceType) => void
  onRemove: (index: number) => void
}

const DEFAULT_AWARD: SpecAwardType = {
  awardName: '',
  host: '',
  acquiredDate: '',
  description: '',
  documentUrl: null,
}

const DEFAULT_EXPERIENCE: SpecExperienceType = {
  experience: '',
  beforeImprovementRate: '',
  afterImprovementRate: '',
  description: '',
  startDate: '',
  endDate: '',
}
export default function AddActivityForm({ index, activity, onUpdate, onRemove }: AddExperienceFormProps) {
  const [type, setType] = useState<'award' | 'experience'>('awardName' in activity ? 'award' : 'experience')

  const handleTypeChange = (newType: 'award' | 'experience') => {
    setType(newType)
    // 타입이 바뀔 때 부모의 activities[index] 데이터를 해당 타입의 기본값으로 교체
    if (newType === 'award') {
      onUpdate(index, DEFAULT_AWARD)
    } else {
      onUpdate(index, DEFAULT_EXPERIENCE)
    }
  }

  return (
    <>
      <Spacing height={16} />

      <Label
        label={'활동 내용'}
        type={'subtitleLg'}
        rightElement={
          <Button
            onClick={() => onRemove(index)}
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
      <SwitchButton
        onClick={handleTypeChange}
        contentList={[
          { content: '수상 경험', type: 'award' },
          { content: '기타 경험', type: 'experience' },
        ]}
        type={type}
      />

      {type === 'award' ? (
        <AddAwardForm index={index} activity={activity as SpecAwardType} onUpdate={onUpdate} />
      ) : (
        <AddExperienceForm index={index} activity={activity as SpecExperienceType} onUpdate={onUpdate} />
      )}
    </>
  )
}
