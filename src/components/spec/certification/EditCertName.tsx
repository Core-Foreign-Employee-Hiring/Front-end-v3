'use client'

import { Label, Spacing, TextInput } from '@/components/common'
import { useTranslation } from 'react-i18next'

interface EditCertNameProps {
  certificationName: string
  handleCertificationChange: (
    fieldName: 'certificationName' | 'acquiredDate' | 'documentUrl',
    value: string | File | null
  ) => void
}

export default function EditCertName({ handleCertificationChange, certificationName }: EditCertNameProps) {
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
        onChange={(e) => handleCertificationChange('certificationName', e.target.value)}
      />
    </div>
  )
}
