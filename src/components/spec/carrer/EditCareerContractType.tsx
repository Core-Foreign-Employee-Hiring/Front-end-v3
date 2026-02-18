import { useDropDown } from '@/hooks'
import { DropDown, Label, Spacing } from '@/components/common'
import { CONTRACT_TYPES } from '@/text/spec'
import { ContractEnumType } from '@/types/spec'
import { useEffect } from 'react'
import { convertEnumToKorContractTypeLabel } from '@/utils/job-post'
import { useTranslation } from 'react-i18next'

interface EditCareerContractTypeProps {
  contractType: ContractEnumType
  handleCareerChange: (
    fieldName: 'contractType' | 'endDate' | 'startDate' | 'highlight' | 'position' | 'companyName',
    value: string | null
  ) => void
}

export default function EditCareerContractType({ contractType, handleCareerChange }: EditCareerContractTypeProps) {
  const { t } = useTranslation()

  const { dropDownOpenHandler, selectedDropDownHandler, selectedDropDownContent, isDropDownOpen, initialValue } =
    useDropDown({ initialValue: '계약형태를 입력해주세요.' })

  useEffect(() => {
    selectedDropDownHandler(t(convertEnumToKorContractTypeLabel(contractType)))
  }, [contractType])

  return (
    <div>
      <Label type={'inputLabel'} label={'계약 형태'} className={'kr-title-sm text-gray5'} />
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
              handleCareerChange('contractType', contractType.enum)
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
