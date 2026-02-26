'use client'

import { SpecExperienceType } from '@/types/spec'
import { useSpecStore } from '@/store/specStore'
import { Button, Label, Spacing } from '@/components/common'
import EditExpDescription from '@/components/spec/experience/EditExpDescription'
import EditExpDuration from '@/components/spec/experience/EditExpDuration'
import EditExperience from '@/components/spec/experience/EditExperience'
import EditExpImprovementRate from '@/components/spec/experience/EditExpImprovementRate'
import { putSpecExperiences } from '@/lib/client/spec/experience'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { useToast } from '@/components/common/toast/ToastContext'

interface EditExperienceFormProps {
  toggleFormOpenState: () => void
  editExperience: SpecExperienceType
  experiencesData: SpecExperienceType[] | null | undefined
}
export default function EditExperienceForm({
  toggleFormOpenState,
  editExperience,
  experiencesData,
}: EditExperienceFormProps) {
  const { t } = useTranslation(['spec', 'message'])
  const { success, error } = useToast()
  const router = useRouter()
  const { setEditExperiences, updateEditExperience } = useSpecStore((state) => state)
  /**
   * 특정 인덱스의 전공명 수정 핸들러
   */
  const handleExperienceChange = (fieldName: keyof SpecExperienceType, value: string | null | number) => {
    // 업데이트 함수 호출 시 변경된 필드만 덮어씌웁니다.
    if (editExperience.experienceId) {
      updateEditExperience(editExperience.experienceId, {
        experience: editExperience.experience,
        beforeImprovementRate: editExperience.beforeImprovementRate,
        afterImprovementRate: editExperience.afterImprovementRate,
        description: editExperience.description,
        startDate: editExperience.startDate,
        endDate: editExperience.endDate,
        [fieldName]: value, // 현재 바뀐 값으로 덮어쓰기
      })
    }
  }

  const handleSave = async () => {
    try {
      const result = await putSpecExperiences(`${editExperience.experienceId}`, editExperience)
      if (result.data) {
        if (result.data.success) {
          router.refresh()
          success(
            t('message:put_spec_experiences.success.title'),
            t('message:put_spec_experiences.success.description')
          )
        } else {
          router.refresh()
          error(t('message:put_spec_experiences.error.title'), t('message:put_spec_experiences.error.description'))
        }
      }
    } catch (e) {
      error(t('message:fetch_error.title'), t('message:fetch_error.description'))
    }
  }

  return (
    <div className="border-gray2 rounded-[12px] border p-5">
      <Spacing height={16} />

      <Label
        label={t('spec:experience.title')}
        type={'subtitleLg'}
        rightElement={
          <Button
            onClick={() => {
              toggleFormOpenState()
              if (experiencesData) {
                setEditExperiences(experiencesData)
              }
            }}
            customClassName={'w-fit'}
            variant={'outline'}
            size={'md'}
          >
            {t('spec:buttons.delete')}
          </Button>
        }
      />
      <Spacing height={24} />
      <EditExperience editExperience={editExperience} handleExperienceChange={handleExperienceChange} />

      <Spacing height={24} />
      <EditExpDuration editExperience={editExperience} handleExperienceChange={handleExperienceChange} />

      <Spacing height={24} />
      <EditExpDescription editExperience={editExperience} handleExperienceChange={handleExperienceChange} />

      <Spacing height={24} />
      <EditExpImprovementRate editExperience={editExperience} handleExperienceChange={handleExperienceChange} />

      <Spacing height={16} />
      <div className="flex w-full justify-end">
        <Button onClick={handleSave} size={'md'} customClassName={'w-[160px]'}>
          {t('spec:buttons.edit')}
        </Button>
      </div>
    </div>
  )
}
