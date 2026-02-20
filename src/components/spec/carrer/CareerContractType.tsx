'use client'

import { ContractEnumType } from '@/types/spec'
import { DropDown, Label, Spacing } from '@/components/common'
import { CONTRACT_TYPES } from '@/text/spec'
import { useDropDown } from '@/hooks'
import { useTranslation } from 'react-i18next'

interface CareerContractTypeProps {
  index: number
  contractType: ContractEnumType
  handleCareerChange: (
    index: number,
    fieldName: 'endDate' | 'startDate' | 'highlight' | 'position' | 'companyName' | 'contractType',
    value: string | null
  ) => void
}
export default function CareerContractType({ index, contractType, handleCareerChange }: CareerContractTypeProps) {
  const { t } = useTranslation(['spec'])
  const { dropDownOpenHandler, selectedDropDownHandler, selectedDropDownContent, isDropDownOpen, initialValue } =
    useDropDown({ initialValue: t('career.form.contractType.placeholder') })
  return (
    <div>
      <Label type={'inputLabel'} label={t('career.form.contractType.title')} className={'kr-title-sm text-gray5'} />
      <Spacing height={8} />
      <DropDown
        selectedValue={selectedDropDownContent}
        defaultValue={initialValue}
        dropDownOpenHandler={dropDownOpenHandler}
        isDropDownOpen={isDropDownOpen}
      >
        {CONTRACT_TYPES.map((contractType) => (
          <DropDown.DropBoxOptionItem
            key={contractType.enum}
            onClick={() => {
              selectedDropDownHandler(contractType.content)
              handleCareerChange(index, 'contractType', contractType.enum)
              dropDownOpenHandler()
            }}
          >
            {contractType.content}
          </DropDown.DropBoxOptionItem>
        ))}
      </DropDown>
    </div>
  )
}
