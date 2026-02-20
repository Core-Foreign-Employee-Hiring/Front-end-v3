'use client'

import { ChangeEvent, useState } from 'react'
import { formatYYYYMM, padMonth } from '@/utils/spec'
import { ErrorHelperText, Label, Spacing, TextInput } from '@/components/common'
import { CheckIcon, UncheckIcon } from '@/assets/svgComponents'
import { useTranslation } from 'react-i18next'

interface EditCareerDurationProps {
  startDate: string
  endDate: string | null
  handleCareerChange: (
    fieldName: 'startDate' | 'endDate' | 'companyName' | 'position' | 'highlight' | 'contractType',
    value: string | null
  ) => void
}

export default function EditCareerDuration({ startDate, endDate, handleCareerChange }: EditCareerDurationProps) {
  const { t } = useTranslation(['spec'])
  // 초기 상태: graduationDate가 null이면 재학 중으로 간주
  const [isInProgress, setIsInProgress] = useState<boolean>(endDate === null)
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fieldName: 'startDate' | 'endDate') => {
    handleCareerChange(fieldName, formatYYYYMM(e.target.value))
  }

  const handleBlur = (value: string | undefined | null, fieldName: 'startDate' | 'endDate') => {
    handleCareerChange(fieldName, padMonth(value))
  }

  const getStatus = (value: string) => (value.length > 0 && value.length < 5 ? 'error' : 'default')

  return (
    <div className="w-full">
      <Label label={t('career.form.duration.title')} className="kr-subtitle-lg text-gray5" isRequired />
      <Spacing height={8} />

      <div className="flex flex-col gap-y-2">
        <div className="flex w-full gap-x-4">
          {/* 시작일 입력 */}
          <TextInput
            value={startDate ?? ''}
            onChange={(e) => handleChange(e, 'startDate')}
            onBlur={() => handleBlur(startDate, 'startDate')}
            status={getStatus(startDate ?? '')}
            helperText=""
            placeholder="YYYY-MM"
          />

          {/* 종료일 입력 */}
          {!isInProgress && (
            <TextInput
              value={endDate ?? ''}
              onChange={(e) => handleChange(e, 'endDate')}
              onBlur={() => handleBlur(endDate, 'endDate')}
              status={getStatus(endDate ?? '')}
              placeholder="YYYY-MM"
            />
          )}
        </div>
        {getStatus(startDate ?? '') === 'error' ? (
          <ErrorHelperText>{t('career.form.duration.startDateErrorMessage')}</ErrorHelperText>
        ) : getStatus(endDate ?? '') === 'error' ? (
          <ErrorHelperText>{t('career.form.duration.endDateErrorMessage')}</ErrorHelperText>
        ) : null}
      </div>

      <Spacing height={8} />
      <button
        type="button"
        onClick={() => {
          const nextState = !isInProgress
          setIsInProgress(nextState)
          handleCareerChange('endDate', nextState ? null : '')
        }}
        className="flex items-center gap-x-2"
      >
        {isInProgress ? <CheckIcon width={24} height={24} /> : <UncheckIcon width={24} height={24} />}
        <p className="kr-subtitle-md text-gray5">{t('career.form.duration.isWorking')}</p>
      </button>
    </div>
  )
}
