import { SpecCareerType } from '@/types/spec'
import { useRouter } from 'next/navigation'
import { useSpecStore } from '@/store/specStore'
import { Button, Label, Spacing } from '@/components/common'
import EditCareerCompanyName from '@/components/spec/carrer/EditCareerCompanyName'
import EditCareerPosition from '@/components/spec/carrer/EditCareerPosition'
import EditCareerDuration from '@/components/spec/carrer/EditCareerDuration'
import EditCareerContractType from '@/components/spec/carrer/EditCareerContractType'
import EditCareerHighlight from '@/components/spec/carrer/EditCareerHighlight'
import { putSpecCareers } from '@/lib/client/spec/career'

interface EditCareerFormProps {
  toggleFormOpenState: () => void
  editCareer: SpecCareerType
  careersData: SpecCareerType[] | null | undefined
}
export default function EditCareerForm({ toggleFormOpenState, editCareer, careersData }: EditCareerFormProps) {
  const router = useRouter()
  const { updateEditCareer, setEditCareers } = useSpecStore((state) => state)

  /**
   * 특정 인덱스의 전공명 수정 핸들러
   */
  const handleCareerChange = (
    fieldName: 'companyName' | 'position' | 'endDate' | 'startDate' | 'highlight' | 'contractType',
    value: string | null
  ) => {
    // 업데이트 함수 호출 시 변경된 필드만 덮어씌웁니다.
    if (editCareer.careerId) {
      updateEditCareer(editCareer.careerId, {
        companyName: editCareer.companyName,
        startDate: editCareer.startDate,
        endDate: editCareer.endDate,
        contractType: editCareer.contractType,
        position: editCareer.position,
        highlight: editCareer.highlight,
        [fieldName]: value, // 현재 바뀐 값으로 덮어쓰기
      })
    }
  }

  const handleSave = async () => {
    try {
      const result = await putSpecCareers(`${editCareer.careerId}`, editCareer)
      if (result.success) {
        router.refresh()
      }
    } catch (error) {
      console.error('저장 중 오류 발생:', error)
    }
  }

  return (
    <div className="border-gray2 rounded-[12px] border p-5">
      <Spacing height={16} />

      <Label
        label={'경력 내용'}
        type={'subtitleLg'}
        rightElement={
          <Button
            onClick={() => {
              toggleFormOpenState()
              if (careersData) {
                setEditCareers(careersData)
              }
            }}
            customClassName={'w-fit'}
            variant={'outline'}
            size={'md'}
          >
            취소
          </Button>
        }
      />

      <Spacing height={16} />
      <EditCareerCompanyName companyName={editCareer.companyName} handleCareerChange={handleCareerChange} />

      <Spacing height={16} />
      <EditCareerPosition position={editCareer.position} handleCareerChange={handleCareerChange} />

      <Spacing height={16} />
      <EditCareerDuration
        startDate={editCareer.startDate}
        endDate={editCareer.endDate}
        handleCareerChange={handleCareerChange}
      />

      <Spacing height={16} />
      <EditCareerContractType contractType={editCareer.contractType} handleCareerChange={handleCareerChange} />

      <Spacing height={16} />
      <EditCareerHighlight highlight={editCareer.highlight} handleCareerChange={handleCareerChange} />

      <Spacing height={16} />
      <div className="flex w-full justify-end">
        <Button onClick={handleSave} size={'md'} customClassName={'w-[160px]'}>
          수정
        </Button>
      </div>
    </div>
  )
}
