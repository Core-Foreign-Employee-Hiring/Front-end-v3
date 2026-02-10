import { ChangeEvent } from 'react'
import { formatYYYYMM, padMonth } from '@/utils/spec'
import { ErrorHelperText, Label, Spacing, TextInput } from '@/components/common'

interface CertAcquiredDateProps {
  index: number
  acquiredDate?: string
  handleCertificationChange: (
    index: number,
    fieldName: 'certificationName' | 'acquiredDate' | 'documentUrl',
    value: string
  ) => void
}

export default function CertAcquiredDate({ index, acquiredDate, handleCertificationChange }: CertAcquiredDateProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    handleCertificationChange(index, 'acquiredDate', formatYYYYMM(e.target.value))
  }

  const handleBlur = (value: string | undefined) => {
    handleCertificationChange(index, 'acquiredDate', padMonth(value))
  }

  const getStatus = (value: string) => (value.length > 0 && value.length < 5 ? 'error' : 'default')

  return (
    <div>
      <Label type={'inputLabel'} label={'취득 날짜'} isRequired={true} className={'kr-title-sm text-gray5'} />
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
          <ErrorHelperText>YYYY-MM 형태로 입력해주세요.</ErrorHelperText>
        ) : null}
      </div>
    </div>
  )
}
