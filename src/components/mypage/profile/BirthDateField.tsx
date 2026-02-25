'use client'

import { useEffect, useState } from 'react'
import { Label, TextInput } from '@/components/common'
import { useModifyProfileStore } from '@/store/modifyProfileStore'
import { useTranslation } from 'react-i18next'

export default function BirthDateField() {
  const { t } = useTranslation('my')
  const { updateProfile, modifyProfileData } = useModifyProfileStore((state) => state)
  const [year, setYear] = useState('')
  const [month, setMonth] = useState('')
  const [day, setDay] = useState('')

  // 1. 초기 데이터 동기화 (Store -> Local State)
  useEffect(() => {
    if (modifyProfileData.birthDate) {
      const [y, m, d] = modifyProfileData.birthDate.split('-')
      setYear(y || '')
      setMonth(m || '')
      setDay(d || '')
    }
    // 최초 마운트 시점에만 실행되도록 종속성 배열을 비웁니다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 1자리 숫자를 2자리(01)로 만들어주는 헬퍼 함수
  const formatPadStart = (value: string) => {
    if (!value) return ''
    return value.padStart(2, '0')
  }

  // 2. 데이터 업데이트 (Local State -> Store)
  useEffect(() => {
    if (year && month && day) {
      const fullDate = `${year}-${formatPadStart(month)}-${formatPadStart(day)}`
      // 무한 루프 방지를 위해 값이 실제로 다를 때만 업데이트
      if (fullDate !== modifyProfileData.birthDate) {
        updateProfile('birthDate', fullDate)
      }
    }
  }, [year, month, day, updateProfile, modifyProfileData.birthDate])

  return (
    <div className="flex flex-col gap-y-2">
      <Label label={t('profile.birth_date_field.label')} />
      <div className="flex gap-x-3">
        <TextInput
          placeholder={t('profile.birth_date_field.placeholders.year')}
          value={year}
          onChange={(e) => setYear(e.target.value)}
          maxLength={4}
        />
        <TextInput
          placeholder={t('profile.birth_date_field.placeholders.month')}
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          onBlur={() => setMonth(formatPadStart(month))}
          maxLength={2}
        />
        <TextInput
          placeholder={t('profile.birth_date_field.placeholders.day')}
          value={day}
          onChange={(e) => setDay(e.target.value)}
          onBlur={() => setDay(formatPadStart(day))}
          maxLength={2}
        />
      </div>
    </div>
  )
}
