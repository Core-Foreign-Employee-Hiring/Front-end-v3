import { SpecAwardType } from '@/types/spec'
import { Button, Label, Spacing } from '@/components/common'
import { uploadFile } from '@/lib/client/common'
import { useSpecStore } from '@/store/specStore'
import { putSpecAwards } from '@/lib/client/spec/award'
import { useRouter } from 'next/navigation'
import EditAwardName from '@/components/spec/award/EditAwardName'
import EditAwardHost from '@/components/spec/award/EditAwardHost'
import EditAwardDocumentUrl from '@/components/spec/award/EditAwardDocumentUrl'
import EditAwardDescription from '@/components/spec/award/EditAwardDescription'
import EditAwardAcquiredDate from '@/components/spec/award/EditAwardAcquiredDate'

interface EditAwardFormProps {
  toggleFormOpenState: () => void
  editAward: SpecAwardType
  awardsData: SpecAwardType[] | null | undefined
}

export default function EditAwardForm({ toggleFormOpenState, editAward, awardsData }: EditAwardFormProps) {
  const { updateEditAward, setEditAwards } = useSpecStore((state) => state)
  const router = useRouter()

  /**
   * 특정 인덱스의 전공명 수정 핸들러
   */
  const handleAwardChange = (
    fieldName: 'awardName' | 'host' | 'acquiredDate' | 'description' | 'documentUrl',
    value: string | File | null
  ) => {
    // 업데이트 함수 호출 시 변경된 필드만 덮어씌웁니다.
    if (editAward.awardId) {
      updateEditAward(editAward.awardId, {
        awardName: editAward.awardName,
        host: editAward.host,
        acquiredDate: editAward.acquiredDate,
        description: editAward.description,
        documentUrl: editAward.documentUrl,
        [fieldName]: value, // 현재 바뀐 값으로 덮어쓰기
      })
    }
  }

  const handleSave = async () => {
    try {
      // 1. 보낼 데이터를 복사해서 준비 (상태값에 의존하지 않도록)
      const dataToSave = { ...editAward }

      // 2. 파일 업로드가 필요한 경우 처리
      if (editAward.documentUrl instanceof File) {
        const uploadUrl = await uploadFile(editAward.documentUrl)

        if (uploadUrl) {
          // 업로드된 URL로 데이터 교체
          dataToSave.documentUrl = uploadUrl
        } else {
          // 업로드 실패 시 로직 처리 (예: return 또는 에러 던지기)
          console.error('파일 업로드에 실패했습니다.')
          return
        }
      }

      // 3. 최종 정제된 데이터로 API 요청 (상태 업데이트를 기다릴 필요 없음)
      const result = await putSpecAwards(`${dataToSave.awardId}`, dataToSave)

      // 4. API 성공 후 UI 상태 동기화 (선택 사항)
      if (result && dataToSave.awardId) {
        updateEditAward(dataToSave.awardId, dataToSave)
        router.refresh()
      }
    } catch (error) {
      console.error('저장 중 오류 발생:', error)
    }
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
              if (awardsData) {
                setEditAwards(awardsData)
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
      <Spacing height={24} />
      <EditAwardName editAward={editAward} handleAwardChange={handleAwardChange} />

      <Spacing height={24} />
      <EditAwardHost editAward={editAward} handleAwardChange={handleAwardChange} />

      <Spacing height={24} />
      <EditAwardAcquiredDate editAward={editAward} handleAwardChange={handleAwardChange} />

      <Spacing height={24} />
      <EditAwardDescription editAward={editAward} handleAwardChange={handleAwardChange} />

      <Spacing height={24} />
      <EditAwardDocumentUrl editAward={editAward} handleAwardChange={handleAwardChange} />

      <div className="flex w-full justify-end">
        <Button onClick={handleSave} size={'md'} customClassName={'w-[160px]'}>
          수정
        </Button>
      </div>
    </div>
  )
}
