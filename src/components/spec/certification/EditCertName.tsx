'use client'

import { Label, Spacing, TextInput } from '@/components/common'

interface EditCertNameProps {
  certificationName: string
  handleCertificationChange: (
    fieldName: 'certificationName' | 'acquiredDate' | 'documentUrl',
    value: string | File | null
  ) => void
}

export default function EditCertName({ handleCertificationChange, certificationName }: EditCertNameProps) {
  return (
    <div>
      <Label type={'inputLabel'} label={'자격증명'} isRequired={true} className={'kr-title-sm text-gray5'} />
      <Spacing height={8} />
      <TextInput
        placeholder={'자격증명을 입력해주세요.'}
        value={certificationName}
        onChange={(e) => handleCertificationChange('certificationName', e.target.value)}
      />
    </div>
  )
}
