'use client'

import { useEffect, useState } from 'react'
import { Label, TextInput } from '@/components/common'
import { useRegisterStore } from '@/store/registerStore'

export default function BirthDateField() {
  const { updateRegister } = useRegisterStore((state) => state)
  const [year, setYear] = useState('')
  const [month, setMonth] = useState('')
  const [day, setDay] = useState('')

  // 1자리 숫자를 2자리(01)로 만들어주는 헬퍼 함수
  const formatPadStart = (value: string) => {
    if (!value) return ''
    return value.padStart(2, '0')
  }

  useEffect(() => {
    if (year && month && day) {
      const fullDate = `${year}-${formatPadStart(month)}-${formatPadStart(day)}`
      updateRegister('birthDate', fullDate)
    }
  }, [year, month, day, updateRegister])

  return (
    <div className="flex flex-col gap-y-2">
      <Label label={'생년월일'} />
      <div className="flex gap-x-3">
        <TextInput placeholder={'년도'} value={year} onChange={(e) => setYear(e.target.value)} maxLength={4} />
        <TextInput
          placeholder={'월'}
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          onBlur={() => setMonth(formatPadStart(month))}
          maxLength={2}
        />
        <TextInput
          placeholder={'일'}
          value={day}
          onChange={(e) => setDay(e.target.value)}
          onBlur={() => setDay(formatPadStart(day))}
          maxLength={2}
        />
      </div>
    </div>
  )
}
