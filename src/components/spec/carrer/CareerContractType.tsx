import { ContractEnumType } from '@/types/spec'
import { DropDown, Label, Spacing } from '@/components/common'
import { CONTRACT_TYPES } from '@/text/spec'
import { useDropDown } from '@/hooks'

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
  const { dropDownOpenHandler, selectedDropDownHandler, selectedDropDownContent, isDropDownOpen, initialValue } =
    useDropDown({ initialValue: '계약형태를 입력해주세요.' })
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
