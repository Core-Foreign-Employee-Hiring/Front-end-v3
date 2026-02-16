'use client'

import { Button, Label, Spacing } from '@/components/common'
import { EduDuration, EduGrades, EduMajor, EduSchool } from '@/components/spec'
import { useSpecStore } from '@/store/specStore'
import { useSpecEducation } from '@/hooks'
import { SpecEducationType } from '@/types/spec'
import { useRouter } from 'next/navigation'
import { postSpecEducation, putSpecEducation } from '@/lib/client/spec/education'

interface AddEduFormProps {
  educationData?: SpecEducationType | null
  onClose: () => void
}

export default function AddEduForm({ educationData, onClose }: AddEduFormProps) {
  const { removeEducation, education, setEducation } = useSpecStore((state) => state)
  const { isActive } = useSpecEducation()
  const router = useRouter()

  // 데이터 존재 여부에 따른 모드 설정
  const isEditMode = !!educationData

  const handleSave = async () => {
    if (!education) return

    try {
      if (isEditMode) {
        // 1. 수정 모드일 때 (PUT 또는 PATCH)
        const result = await putSpecEducation(`${education.educationId}`, education) // 수정 API 호출
        console.log('교육 데이터 수정 완료', result)
        if (result.success) {
          onClose()
          router.refresh()
        }
      } else {
        // 2. 신규 작성 모드일 때 (POST)
        const result = await postSpecEducation(education)
        console.log('교육 데이터 저장 완료', result)
        if (result.success) {
          onClose()
          router.refresh()
        }
      }
    } catch (error) {
      console.error('데이터 처리 중 오류 발생:', error)
    }
  }

  return (
    <div className="border-gray2 rounded-[12px] border p-5">
      <Label
        label={isEditMode ? '학력 수정' : '학력 내역'} // 제목 동적 변경
        type={'subtitleLg'}
        rightElement={
          <div className="flex gap-x-2">
            <Button
              state={!isActive ? 'disable' : 'default'}
              disabled={!isActive}
              customClassName={'w-fit'}
              onClick={handleSave}
              size={'md'}
              variant={'outline'}
            >
              {isEditMode ? '수정' : '저장'}
            </Button>
            <Button
              onClick={() => {
                if (isEditMode) {
                  setEducation(educationData)
                  onClose()
                } else {
                  removeEducation()
                  onClose()
                }
                onClose()
              }}
              customClassName={'w-fit'}
              variant={'outline'}
              size={'md'}
            >
              취소
            </Button>
          </div>
        }
      />
      <Spacing height={24} />

      <EduSchool />
      <Spacing height={24} />

      <EduDuration />
      <Spacing height={24} />

      <EduMajor />
      <Spacing height={24} />

      <EduGrades />
      <Spacing height={24} />
    </div>
  )
}
