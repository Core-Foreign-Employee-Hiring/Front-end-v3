'use client'

import { SpecExperienceType } from '@/types/spec'
import { FocusEvent, useState } from 'react'
import { ErrorHelperText, Label, Spacing, TextInput } from '@/components/common'
import { useTranslation } from 'react-i18next'
import { HelpIcon } from '@/assets/svgComponents'
import Tooltip from '@/components/common/Tooltip'

interface ExpImprovementRateProps {
  experience: SpecExperienceType
  index: number
  handleExperienceChange: (index: number, fieldName: keyof SpecExperienceType, value: string | number | null) => void
}
export default function ExpImprovementRate({ index, handleExperienceChange, experience }: ExpImprovementRateProps) {
  const { t } = useTranslation(['spec', 'common'])
  const [isToolTipOpen, setIsToolTipOpen] = useState(false)
  // 1. 포커스 시 0 제거 로직
  const handleFocus = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>, fieldName: keyof SpecExperienceType) => {
    // 값이 '0'이면 빈 값으로 변경 (사용자가 바로 입력할 수 있게)
    if (e.target.value === '0') {
      handleExperienceChange(index, fieldName, '')
    }
  }

  // 2. 포커스 아웃 시 빈 값이면 다시 0으로 채우는 로직 (선택 사항)
  const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>, fieldName: keyof SpecExperienceType) => {
    if (e.target.value === '') {
      handleExperienceChange(index, fieldName, '0')
    }
  }

  const getStatus = () => {
    if (typeof experience.afterImprovementRate === 'string' && typeof experience.beforeImprovementRate === 'string') {
      return parseInt(experience.beforeImprovementRate) > parseInt(experience.afterImprovementRate)
        ? 'error'
        : 'default'
    }
  }

  return (
    <div className="w-full">
      <div className="relative flex gap-x-1">
        <Label label={t('spec:experience.form.improvementRate.title')} className="kr-subtitle-lg text-gray5" />
        <HelpIcon
          className="cursor-pointer"
          onClick={() => {
            setIsToolTipOpen(!isToolTipOpen)
          }}
          width={24}
          height={24}
        />
        {isToolTipOpen ? <Tooltip description={t('common:tooltip.improvement_rate')} /> : null}
      </div>
      <Label label={t('spec:experience.form.improvementRate.title')} className="kr-subtitle-lg text-gray5" />
      <Spacing height={8} />
      <div className="flex flex-col gap-y-2">
        <div className="flex w-full gap-x-4">
          <TextInput
            rightElement={<p className="kr-body-md">%</p>}
            status={getStatus()}
            onFocus={(e) => handleFocus(e, 'beforeImprovementRate')}
            onBlur={(e) => handleBlur(e, 'beforeImprovementRate')}
            onChange={(e) => handleExperienceChange(index, 'beforeImprovementRate', Number(e.target.value))}
            inputType={'number'}
            value={experience.beforeImprovementRate}
            placeholder={t('spec:experience.form.improvementRate.beforeImprovementRatePlaceholder')}
          />
          <TextInput
            rightElement={<p className="kr-body-md">%</p>}
            status={getStatus()}
            onFocus={(e) => handleFocus(e, 'afterImprovementRate')}
            onBlur={(e) => handleBlur(e, 'afterImprovementRate')}
            onChange={(e) => handleExperienceChange(index, 'afterImprovementRate', Number(e.target.value))}
            inputType={'number'}
            value={experience.afterImprovementRate}
            placeholder={t('spec:experience.form.improvementRate.afterImprovementRatePlaceholder')}
          />
        </div>
        {getStatus() === 'error' ? (
          <ErrorHelperText>{t('spec:experience.form.improvementRate.error')}</ErrorHelperText>
        ) : null}
      </div>
    </div>
  )
}
