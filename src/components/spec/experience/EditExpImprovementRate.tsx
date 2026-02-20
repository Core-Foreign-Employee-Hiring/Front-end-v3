'use client'

import { SpecExperienceType } from '@/types/spec'
import { ErrorHelperText, Label, Spacing, TextInput } from '@/components/common'
import { FocusEvent } from 'react'
import { useTranslation } from 'react-i18next'

interface EditExpImprovementRateProps {
  editExperience: SpecExperienceType
  handleExperienceChange: (fieldName: keyof SpecExperienceType, value: string | number | null) => void
}
export default function EditExpImprovementRate({
  editExperience,
  handleExperienceChange,
}: EditExpImprovementRateProps) {
  const { t } = useTranslation(['spec'])
  // 1. 포커스 시 0 제거 로직
  const handleFocus = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>, fieldName: keyof SpecExperienceType) => {
    // 값이 '0'이면 빈 값으로 변경 (사용자가 바로 입력할 수 있게)
    if (e.target.value === '0') {
      handleExperienceChange(fieldName, '')
    }
  }

  // 2. 포커스 아웃 시 빈 값이면 다시 0으로 채우는 로직 (선택 사항)
  const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>, fieldName: keyof SpecExperienceType) => {
    if (e.target.value === '') {
      handleExperienceChange(fieldName, '0')
    }
  }

  const getStatus = () => {
    if (
      typeof editExperience.afterImprovementRate === 'string' &&
      typeof editExperience.beforeImprovementRate === 'string'
    ) {
      return parseInt(editExperience.beforeImprovementRate) > parseInt(editExperience.afterImprovementRate)
        ? 'error'
        : 'default'
    }
  }

  return (
    <div className="w-full">
      <Label label={t('experience.form.improvementRate.title')} className="kr-subtitle-lg text-gray5"></Label>
      <Spacing height={8} />
      <div className="flex flex-col gap-y-2">
        <div className="flex w-full gap-x-4">
          <TextInput
            status={getStatus()}
            onFocus={(e) => handleFocus(e, 'beforeImprovementRate')}
            onBlur={(e) => handleBlur(e, 'beforeImprovementRate')}
            onChange={(e) => handleExperienceChange('beforeImprovementRate', Number(e.target.value))}
            inputType={'number'}
            value={editExperience.beforeImprovementRate}
            placeholder={t('experience.form.improvementRate.beforeImprovementRatePlaceholder')}
          />
          <TextInput
            status={getStatus()}
            onFocus={(e) => handleFocus(e, 'afterImprovementRate')}
            onBlur={(e) => handleBlur(e, 'afterImprovementRate')}
            onChange={(e) => handleExperienceChange('afterImprovementRate', Number(e.target.value))}
            inputType={'number'}
            value={editExperience.afterImprovementRate}
            placeholder={t('experience.form.improvementRate.afterImprovementRatePlaceholder')}
          />
        </div>
        {getStatus() === 'error' ? (
          <ErrorHelperText>{t('experience.form.improvementRate.error')}</ErrorHelperText>
        ) : null}
      </div>
    </div>
  )
}
