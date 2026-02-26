'use client'

import { useEffect, useState } from 'react'
import { Label, TextInput } from '@/components/common'
import { useRegisterStore } from '@/store/registerStore'
import { useTranslation } from 'react-i18next'
import ErrorMessage from '@/components/common/ErrorMessage'

export default function BirthDateField() {
  const { t } = useTranslation('signup')
  const { updateRegister } = useRegisterStore((state) => state)
  const [year, setYear] = useState('')
  const [month, setMonth] = useState('')
  const [day, setDay] = useState('')

  // 에러 상태 관리 (처음에는 false)
  const [yearError, setYearError] = useState(false)

  const formatPadStart = (value: string) => {
    if (!value) return ''
    return value.padStart(2, '0')
  }

  // 연도 유효성 검사 함수
  const validateYear = (value: string) => {
    if (value.length > 0 && value.length < 4) {
      setYearError(true)
    } else {
      setYearError(false)
    }
  }

  useEffect(() => {
    // 4자리일 때만 store 업데이트 (선택 사항: 에러일 땐 업데이트 안 함)
    if (year.length === 4 && month && day) {
      const fullDate = `${year}-${formatPadStart(month)}-${formatPadStart(day)}`
      updateRegister('birthDate', fullDate)
    }
  }, [year, month, day, updateRegister])

  return (
    <div className="flex flex-col gap-y-2">
      <Label label={t('step2.birthDateField.label')} />
      <div className="flex flex-col gap-y-1">
        {' '}
        {/* 에러 메시지 배치를 위해 감쌈 */}
        <div className="flex gap-x-3">
          <TextInput
            status={yearError ? 'error' : 'default'}
            placeholder={t('step2.birthDateField.placeholder.year')}
            value={year}
            onChange={(e) => {
              const val = e.target.value.replace(/[^0-9]/g, '') // 숫자만 입력 가능하게
              setYear(val)
              if (val.length === 4) setYearError(false) // 4자리 채워지면 에러 즉시 해제
            }}
            onBlur={() => validateYear(year)} // 포커스 나갈 때 검사
            maxLength={4}
            // TextInput 컴포넌트에 에러 스타일 props가 있다면 활용 (예: isError={yearError})
          />
          <TextInput
            placeholder={t('step2.birthDateField.placeholder.month')}
            value={month}
            onChange={(e) => setMonth(e.target.value.replace(/[^0-9]/g, ''))}
            onBlur={() => setMonth(formatPadStart(month))}
            maxLength={2}
          />
          <TextInput
            placeholder={t('step2.birthDateField.placeholder.day')}
            value={day}
            onChange={(e) => setDay(e.target.value.replace(/[^0-9]/g, ''))}
            onBlur={() => setDay(formatPadStart(day))}
            maxLength={2}
          />
        </div>
        {/* 에러 메시지 영역 */}
        {yearError && <ErrorMessage>{t('step2.birthDateField.message.error')}</ErrorMessage>}
      </div>
    </div>
  )
}
