'use client'

import { ChangeEvent } from 'react'
import { formatYYYYMM, padMonth } from '@/utils/spec'
import { ErrorHelperText, Label, Spacing, TextInput } from '@/components/common'
import { useTranslation } from 'react-i18next'

interface EditCertAcquiredDateProps {
  acquiredDate: string
  handleCertificationChange: (
    fieldName: 'certificationName' | 'acquiredDate' | 'documentUrl',
    value: string | File | null
  ) => void
}
export default function EditCertAcquiredDate({ acquiredDate, handleCertificationChange }: EditCertAcquiredDateProps) {
  const { t } = useTranslation(['spec'])
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    handleCertificationChange('acquiredDate', formatYYYYMM(e.target.value))
  }

  const handleBlur = (value: string | undefined) => {
    handleCertificationChange('acquiredDate', padMonth(value))
  }

  const getStatus = (value: string) => (value.length > 0 && value.length < 5 ? 'error' : 'default')

  return (
    <div>
      <Label
        type={'inputLabel'}
        label={t('certification.form.acquiredDate.title')}
        isRequired={true}
        className={'kr-title-sm text-gray5'}
      />
      <Spacing height={8} />
      <div className="flex flex-col gap-y-2">
        <TextInput
          placeholder={'YYYY-MM'}
          value={acquiredDate ?? ''}
          status={getStatus(acquiredDate ?? '')}
          onChange={(e) => handleChange(e)}
          onBlur={() => handleBlur(acquiredDate)}
        />
        {getStatus(acquiredDate ?? '') === 'error' ? (
          <ErrorHelperText>{t('certification.form.acquiredDate.acquiredDateError')}</ErrorHelperText>
        ) : null}
      </div>
    </div>
  )
}
