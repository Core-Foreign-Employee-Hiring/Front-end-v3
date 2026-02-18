'use client'

import { SpecAwardType } from '@/types/spec'
import { Label, Spacing, TextInput } from '@/components/common'

interface EditAwardNameProps {
  editAward: SpecAwardType
  handleAwardChange: (
    fieldName: 'awardName' | 'host' | 'acquiredDate' | 'description' | 'documentUrl',
    value: string | File | null
  ) => void
}

export default function EditAwardName({ editAward, handleAwardChange }: EditAwardNameProps) {
  return (
    <div>
      <Label type={'inputLabel'} label={'수상명'} isRequired={true} className={'kr-title-sm text-gray5'} />
      <Spacing height={8} />
      <TextInput
        placeholder={'수상명을 입력해주세요.'}
        value={editAward.awardName}
        onChange={(e) => handleAwardChange('awardName', e.target.value)}
      />
    </div>
  )
}
