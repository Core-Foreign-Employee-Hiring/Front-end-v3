import { Button, Label, Spacing } from '@/components/common'
import { DeleteIcon } from '@/assets/svgComponents'
import { useSpecStore } from '@/store/specStore'
import {
  CareerCompanyName,
  CareerContractType,
  CareerDuration,
  CareerHighlight,
  CareerPosition,
} from '@/components/spec'
import { ContractEnumType } from '@/types/spec'

interface AddCareerFormProps {
  index: number
  companyName: string
  position: string
  startDate: string
  endDate: string | null
  contractType: ContractEnumType
  highlight: string
}

export default function AddCareerForm({
  index,
  endDate,
  startDate,
  highlight,
  position,
  contractType,
  companyName,
}: AddCareerFormProps) {
  const removeCareer = useSpecStore((state) => state.removeCareer)
  const updateCareer = useSpecStore((state) => state.updateCareer)

  /**
   * 특정 인덱스의 전공명 수정 핸들러
   */
  const handleCareerChange = (
    index: number,
    fieldName: 'companyName' | 'position' | 'endDate' | 'startDate' | 'highlight' | 'contactType',
    value: string | null
  ) => {
    // 업데이트 함수 호출 시 변경된 필드만 덮어씌웁니다.
    updateCareer(index, {
      companyName,
      startDate,
      endDate,
      contractType,
      position,
      highlight,
      [fieldName]: value, // 현재 바뀐 값으로 덮어쓰기
    })
  }
  return (
    <>
      <Spacing height={16} />

      <Label
        label={'경력 내용'}
        type={'subtitleLg'}
        rightElement={
          <Button
            onClick={() => removeCareer(index)}
            leftIcon={<DeleteIcon width={20} height={20} />}
            customClassName={'w-fit'}
            variant={'outline'}
            size={'md'}
          >
            삭제
          </Button>
        }
      />

      <Spacing height={16} />
      <CareerCompanyName index={index} companyName={companyName} handleCareerChange={handleCareerChange} />

      <Spacing height={16} />
      <CareerPosition index={index} position={position} handleCareerChange={handleCareerChange} />

      <Spacing height={16} />
      <CareerDuration index={index} startDate={startDate} endDate={endDate} handleCareerChange={handleCareerChange} />

      <Spacing height={16} />
      <CareerContractType index={index} contractType={contractType} handleCareerChange={handleCareerChange} />

      <Spacing height={16} />
      <CareerHighlight index={index} highlight={highlight} handleCareerChange={handleCareerChange} />
    </>
  )
}
