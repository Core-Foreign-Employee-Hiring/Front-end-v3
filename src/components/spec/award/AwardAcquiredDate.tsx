import { ChangeEvent, JSX } from 'react'
import { formatYYYYMM, padMonth } from '@/utils/spec'
import { ErrorHelperText, Label, Spacing, TextInput } from '@/components/common'
import { SpecAwardType } from '@/types/spec'

interface AwardAcquiredDateProps {
  index: number
  award: SpecAwardType
  handleAwardChange: (
    index: number,
    fieldName: 'awardName' | 'host' | 'acquiredDate' | 'description' | 'documentUrl',
    value: string | File | null
  ) => void
}

export default function AwardAcquiredDate({ index, award, handleAwardChange }: AwardAcquiredDateProps): JSX.Element {
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    handleAwardChange(index, 'acquiredDate', formatYYYYMM(e.target.value))
  }

  const handleBlur = (value: string | undefined) => {
    handleAwardChange(index, 'acquiredDate', padMonth(value))
  }

  const getStatus = (value: string) => (value.length > 0 && value.length < 5 ? 'error' : 'default')

  return (
    <div>
      <Label type={'inputLabel'} label={'취득 날짜'} isRequired={true} className={'kr-title-sm text-gray5'} />
      <Spacing height={8} />
      <div className="flex flex-col gap-y-2">
        <TextInput
          placeholder={'YYYY-MM'}
          value={award.acquiredDate ?? ''}
          status={getStatus(award.acquiredDate ?? '')}
          onChange={(e) => handleChange(e)}
          onBlur={() => handleBlur(award.acquiredDate)}
        />
        {getStatus(award.acquiredDate ?? '') === 'error' ? (
          <ErrorHelperText>취득 날짜를 YYYY-MM 형태로 입력해주세요.</ErrorHelperText>
        ) : null}
      </div>
    </div>
  )
}
