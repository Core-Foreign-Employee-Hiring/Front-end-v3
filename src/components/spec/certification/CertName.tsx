'use client'

import { Label, Spacing, TextInput } from '@/components/common'

interface CertNameProps {
  index: number
  certificationName: string
  handleCertificationChange: (
    index: number,
    fieldName: 'certificationName' | 'acquiredDate' | 'documentUrl',
    value: string
  ) => void
}

export default function CertName({ handleCertificationChange, index, certificationName }: CertNameProps) {
  return (
    <div>
      <Label type={'inputLabel'} label={'자격증명'} isRequired={true} className={'kr-title-sm text-gray5'} />
      <Spacing height={8} />
      <TextInput
        placeholder={'자격증명을 입력해주세요.'}
        value={certificationName}
        onChange={(e) => handleCertificationChange(index, 'certificationName', e.target.value)}
      />
    </div>
  )
}
