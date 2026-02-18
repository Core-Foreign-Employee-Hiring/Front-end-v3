import { SpecAwardType } from '@/types/spec'
import { Button, Label, Spacing } from '@/components/common'
import { AwardAcquiredDate, AwardDescription, AwardDocumentUrl, AwardHost, AwardName } from '@/components/spec'
import { useSpecStore } from '@/store/specStore'

interface AddAwardFormProps {
  index: number
  toggleFormOpenState: () => void
  award: SpecAwardType
}
export default function AddAwardForm({ index, toggleFormOpenState, award }: AddAwardFormProps) {
  const { updateAward, removeAward } = useSpecStore((state) => state)

  /**
   * 특정 인덱스의 전공명 수정 핸들러
   */
  const handleAwardChange = (
    index: number,
    fieldName: 'awardName' | 'host' | 'acquiredDate' | 'description' | 'documentUrl',
    value: string | File | null
  ) => {
    // 업데이트 함수 호출 시 변경된 필드만 덮어씌웁니다.
    updateAward(index, {
      awardName: award.awardName,
      host: award.host,
      acquiredDate: award.acquiredDate,
      description: award.description,
      documentUrl: award.documentUrl,
      [fieldName]: value, // 현재 바뀐 값으로 덮어쓰기
    })
  }

  return (
    <div className="border-gray2 rounded-[12px] border p-5">
      <Label
        label={'수상 내용'}
        type={'subtitleLg'}
        rightElement={
          <Button
            onClick={() => {
              toggleFormOpenState()
              removeAward(index)
            }}
            customClassName={'w-fit'}
            variant={'outline'}
            size={'md'}
          >
            취소
          </Button>
        }
      />
      <Spacing height={24} />
      <AwardName index={index} award={award} handleAwardChange={handleAwardChange} />

      <Spacing height={24} />
      <AwardHost index={index} award={award} handleAwardChange={handleAwardChange} />

      <Spacing height={24} />
      <AwardAcquiredDate index={index} award={award} handleAwardChange={handleAwardChange} />

      <Spacing height={24} />
      <AwardDescription index={index} award={award} handleAwardChange={handleAwardChange} />

      <Spacing height={24} />
      <AwardDocumentUrl index={index} award={award} handleAwardChange={handleAwardChange} />
    </div>
  )
}
