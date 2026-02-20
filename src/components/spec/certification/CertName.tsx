'use client'

import { Label, Spacing, TextInput } from '@/components/common'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation(['spec'])
  return (
    <div>
      <Label
        type={'inputLabel'}
        label={t('certification.form.name.title')}
        isRequired={true}
        className={'kr-title-sm text-gray5'}
      />
      <Spacing height={8} />
      <TextInput
        placeholder={t('certification.form.name.placeholder')}
        value={certificationName}
        onChange={(e) => handleCertificationChange(index, 'certificationName', e.target.value)}
      />
    </div>
  )
}
