'use client'

import { SpecExperienceType } from '@/types/spec'
import { usePathname, useRouter } from 'next/navigation'
import { StepType } from '@/app/[lang]/carrer/page'
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

interface SpecExperienceProps {
  experiencesData: SpecExperienceType[] | null | undefined
}
export default function SpecExperience({ experiencesData }: SpecExperienceProps) {
  const { t } = useTranslation(['spec', 'message'])
  const { toggleModal, setModal, modals } = useModalStore((state) => state)
  const router = useRouter()
  const pathname = usePathname()
  const { success, error } = useToast()
  const { addExperience, editExperiences, setEditExperiences, experiences, setExperiences, setSpecEvaluationId } =
    useSpecStore((state) => state)
  useEffect(() => {
    if (experiencesData) {
      setEditExperiences(experiencesData)
    }
  }, [experiencesData])

  const navigateToStep = (step: StepType) => {
    router.push(`${pathname}?tab=spec&step=${encodeURIComponent(step)}`)
  }

  const handlePrev = () => navigateToStep('5')

  const handleNext = async () => {
    setModal('isCareerAnalysisLoadingModalOpen', true)

    const specResult = await postSpecResult()
    if (specResult.success && specResult.data?.data) {
      success(t('post_spec_result.success.title'), t('post_spec_result.success.description'))
      setSpecEvaluationId(specResult.data.data)
      setModal('isCareerAnalysisLoadingModalOpen', false)
      router.push(`/carrer/${specResult.data.data}`)
    } else if (!specResult.data?.success) {
      setModal('isCareerAnalysisLoadingModalOpen', false)
      error(t('post_spec_result.error.title'), t('post_spec_result.error.description'))
    }
  }

  const handleSave = async () => {
    try {
      const result = await postSpecExperiences(experiences)

      // 3. 성공 후 처리
      if (result.data) {
        if (result.data.success) {
          setExperiences([]) // 추가용 임시 상태 초기화 (필요시)
          router.refresh()
          success(
            t('message:post_spec_experiences.success.title'),
            t('message:post_spec_experiences.success.description')
          )
        } else {
          setExperiences([]) // 추가용 임시 상태 초기화 (필요시)
          router.refresh()
          error(t('message:post_spec_experiences.error.title'), t('message:post_spec_experiences.error.description'))
        }
      }
    } catch (e) {
      error(t('message:fetch_error.title'), t('message:fetch_error.description'))
    }
  }

  return (
    <div>
      {modals.isCareerAnalysisLoadingModalOpen ? <CareerAnalysisLoadingModal /> : null}
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
            key={editExperience.experienceId}
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
