'use client'

import { Button, Label, Spacing } from '@/components/common'
import { EduDuration, EduGrades, EduMajor, EduSchool } from '@/components/spec'
import { useSpecStore } from '@/store/specStore'
import { useSpecEducation } from '@/hooks'
import { SpecEducationType } from '@/types/spec'
import { useRouter } from 'next/navigation'
import { postSpecEducation, putSpecEducation } from '@/lib/client/spec/education'
import { useTranslation } from 'react-i18next'
import { useToast } from '@/components/common/toast/ToastContext'

interface AddEduFormProps {
  educationData?: SpecEducationType | null
  onClose: () => void
}

export default function AddEduForm({ educationData, onClose }: AddEduFormProps) {
  const { removeEducation, education, setEducation } = useSpecStore((state) => state)
  const { isActive } = useSpecEducation(educationData)
  const router = useRouter()
  const { t } = useTranslation(['spec', 'message'])
  const { success, error } = useToast()

  // 데이터 존재 여부에 따른 모드 설정
  const isEditMode = !!educationData

  const handleSave = async () => {
    if (!education) return

    try {
      if (isEditMode) {
        // 1. 수정 모드일 때 (PUT 또는 PATCH)
        const result = await putSpecEducation(`${education.educationId}`, education) // 수정 API 호출
        if (result.data) {
          if (result.data.success) {
            onClose()
            router.refresh()
            success(t('message:put_spec_education.success.title'), t('message:put_spec_education.success.description'))
          } else {
            onClose()
            router.refresh()
            error(t('message:put_spec_education.error.title'), t('message:put_spec_education.error.description'))
          }
        }
      } else {
        // 2. 신규 작성 모드일 때 (POST)
        const result = await postSpecEducation(education)
        if (result.data) {
          if (result.data.success) {
            onClose()
            router.refresh()
            success(
              t('message:post_spec_education.success.title'),
              t('message:post_spec_education.success.description')
            )
          } else {
            onClose()
            router.refresh()
            error(t('message:post_spec_education.error.title'), t('message:post_spec_education.error.description'))
          }
        } else {
        }
      }
    } catch (e) {
      error(t('message:fetch_error.title'), t('message:fetch_error.description'))
    }
  }

  return (
    <div className="border-gray2 rounded-[12px] border p-5">
      <Label
        label={isEditMode ? t('spec:education.addEduForm.editTitle') : t('spec:education.addEduForm.initTitle')} // 제목 동적 변경
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
              {isEditMode ? t('spec:buttons.edit') : t('spec:buttons.save')}
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
              {t('spec:buttons.cancel')}
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
