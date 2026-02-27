'use client'

import { SpecExperienceType } from '@/types/spec'
import { useRouter } from 'next/navigation'
import { Button, Label, Spacing } from '@/components/common'
import { Main5000PlusIcon } from '@/assets/svgComponents'
import { BottomButton } from '@/components/spec'
import { useSpecStore } from '@/store/specStore'
import { useEffect } from 'react'
import EditExperienceEntry from '@/components/spec/experience/EditExperienceEntry'
import ExperienceEntry from '@/components/spec/experience/ExperienceEntry'
import { postSpecExperiences } from '@/lib/client/spec/experience'
import { postSpecResult } from '@/lib/client/spec'
import { useTranslation } from 'react-i18next'
import { useToast } from '@/components/common/toast/ToastContext'
import { useModalStore } from '@/store/modalStore'
import CareerAnalysisLoadingModal from '@/components/common/modal/CareerAnalysisLoadingModal'
import useSpecExperience from '@/hooks/spec/useSpecExperience'

interface SpecExperienceProps {
  experiencesData: SpecExperienceType[] | null | undefined
}

export default function SpecExperience({ experiencesData }: SpecExperienceProps) {
  const { t } = useTranslation(['spec', 'message'])
  const { setModal, modals } = useModalStore((state) => state)
  const router = useRouter()
  const { success, error } = useToast()

  const { addExperience, editExperiences, setEditExperiences, experiences, setExperiences, setSpecEvaluationId } =
    useSpecStore((state) => state)

  // 훅 적용
  const { handlePrev, isChanged, isActive } = useSpecExperience(experiencesData)

  useEffect(() => {
    if (experiencesData) {
      setEditExperiences(experiencesData)
    }
  }, [experiencesData, setEditExperiences])

  const handleNext = async () => {
    // 변경사항이 남아있으면 진행 막기
    if (isChanged) {
      error(t('message:save_error.title'), t('message:save_error.description'))
      return
    }

    setModal('isCareerAnalysisLoadingModalOpen', true)

    try {
      const specResult = await postSpecResult()
      if (specResult.success && specResult.data?.data) {
        success(t('message:post_spec_result.success.title'), t('message:post_spec_result.success.description'))
        setSpecEvaluationId(specResult.data.data)
        setModal('isCareerAnalysisLoadingModalOpen', false)
        router.push(`/carrer/${specResult.data.data}`)
      } else {
        setModal('isCareerAnalysisLoadingModalOpen', false)
        error(t('message:post_spec_result.error.title'), t('message:post_spec_result.error.description'))
      }
    } catch (e) {
      setModal('isCareerAnalysisLoadingModalOpen', false)
      error(t('message:fetch_error.title'), t('message:fetch_error.description'))
    }
  }

  const handleSave = async () => {
    try {
      const result = await postSpecExperiences(experiences)

      if (result.data?.success) {
        // 성공 시 상태 동기화
        setEditExperiences([...editExperiences, ...experiences])
        setExperiences([])
        router.refresh()

        success(
          t('message:post_spec_experiences.success.title'),
          t('message:post_spec_experiences.success.description')
        )
      } else {
        error(t('message:post_spec_experiences.error.title'), t('message:post_spec_experiences.error.description'))
      }
    } catch (e) {
      error(t('message:fetch_error.title'), t('message:fetch_error.description'))
    }
  }

  return (
    <div>
      {modals.isCareerAnalysisLoadingModalOpen && <CareerAnalysisLoadingModal />}
      <Label
        label={t('spec:experience.title')}
        type={'titleMd'}
        rightElement={
          <div className="flex gap-x-2">
            <Button size={'md'} customClassName={'w-[72px]'} onClick={handleSave}>
              {t('spec:buttons.save')}
            </Button>
            <Button
              onClick={() => {
                addExperience({
                  experience: '',
                  beforeImprovementRate: '',
                  afterImprovementRate: '',
                  description: '',
                  startDate: '',
                  endDate: '',
                })
              }}
              variant={'secondary'}
              size={'md'}
              customClassName={'w-fit'}
              leftIcon={<Main5000PlusIcon width={20} height={20} />}
            >
              {t('spec:buttons.add')}
            </Button>
          </div>
        }
      />

      <Spacing height={16} />

      <div className="flex flex-col gap-y-[16px]">
        {editExperiences.map((editExperience) => (
          <EditExperienceEntry
            experiencesData={experiencesData}
            initialFormOpenState={false}
            key={editExperience.experienceId || editExperience.experience}
            editExperience={editExperience}
          />
        ))}
      </div>

      <Spacing height={16} />

      <div className="flex flex-col gap-y-[16px]">
        {experiences.map((experience, index) => (
          <ExperienceEntry key={index} experience={experience} index={index} initialFormOpenState={true} />
        ))}
      </div>

      <Spacing height={100} />
      <BottomButton handlePrev={handlePrev} isNextButtonActive={true} handleNext={handleNext} />
    </div>
  )
}
