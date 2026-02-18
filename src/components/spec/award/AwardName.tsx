'use client'

import { SpecAwardType } from '@/types/spec'
import { Label, Spacing, TextInput } from '@/components/common'

interface AwardNameProps {
  index: number
  award: SpecAwardType
  handleAwardChange: (
    index: number,
    fieldName: 'awardName' | 'host' | 'acquiredDate' | 'description' | 'documentUrl',
    value: string | File | null
  ) => void
}

export default function AwardName({ index, award, handleAwardChange }: AwardNameProps) {
  return (
    <div>
      <Label type={'inputLabel'} label={'수상명'} isRequired={true} className={'kr-title-sm text-gray5'} />
      <Spacing height={8} />
      <TextInput
        placeholder={'수상명을 입력해주세요.'}
        value={award.awardName}
        onChange={(e) => handleAwardChange(index, 'awardName', e.target.value)}
      />
    </div>
  )
}
