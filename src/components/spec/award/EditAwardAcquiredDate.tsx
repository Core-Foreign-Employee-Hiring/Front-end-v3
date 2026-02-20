'use client'

import { SpecAwardType } from '@/types/spec'
import { ChangeEvent } from 'react'
import { formatYYYYMM, padMonth } from '@/utils/spec'
import { ErrorHelperText, Label, Spacing, TextInput } from '@/components/common'
import { useTranslation } from 'react-i18next'

interface EditAwardAcquiredDateProps {
  editAward: SpecAwardType
  handleAwardChange: (
    fieldName: 'awardName' | 'host' | 'acquiredDate' | 'description' | 'documentUrl',
    value: string | File | null
  ) => void
}
export default function EditAwardAcquiredDate({ editAward, handleAwardChange }: EditAwardAcquiredDateProps) {
  const { t } = useTranslation(['spec'])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    handleAwardChange('acquiredDate', formatYYYYMM(e.target.value))
  }

  const handleBlur = (value: string | undefined) => {
    handleAwardChange('acquiredDate', padMonth(value))
  }

  const getStatus = (value: string) => (value.length > 0 && value.length < 5 ? 'error' : 'default')

  return (
    <div>
      <Label
        type={'inputLabel'}
        label={t('award.form.acquiredDate.title')}
        isRequired={true}
        className={'kr-title-sm text-gray5'}
      />
      <Spacing height={8} />
      <div className="flex flex-col gap-y-2">
        <TextInput
          placeholder={'YYYY-MM'}
          value={editAward.acquiredDate ?? ''}
          status={getStatus(editAward.acquiredDate ?? '')}
          onChange={(e) => handleChange(e)}
          onBlur={() => handleBlur(editAward.acquiredDate)}
        />
        {getStatus(editAward.acquiredDate ?? '') === 'error' ? (
          <ErrorHelperText>{t('award.form.acquiredDate.error')}</ErrorHelperText>
        ) : null}
      </div>
    </div>
  )
}
