'use client'

import { Button, Label, Spacing } from '@/components/common'
import { Main5000PlusIcon } from '@/assets/svgComponents'
import { BottomButton } from '@/components/spec/index'
import { useSpecCareer } from '@/hooks'
import { SpecCareerType } from '@/types/spec'
import { useSpecStore } from '@/store/specStore'
import { useEffect } from 'react'
import EditCareerEntry from '@/components/spec/carrer/EditCareerEntry'
import CareerEntry from '@/components/spec/carrer/CareerEntry'
import { postSpecCareers } from '@/lib/client/spec/career'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { useToast } from '@/components/common/toast/ToastContext'

interface SpecCareerProps {
  careersData: SpecCareerType[] | null | undefined
}

export default function SpecCareer({ careersData }: SpecCareerProps) {
  const { t } = useTranslation(['spec', 'message'])
  const router = useRouter()
  const { handleNext, handlePrev, careers, isActive } = useSpecCareer()
  const { success, error } = useToast()

  const { editCareers, setEditCareers, addCareer, setCareers } = useSpecStore((state) => state)

  useEffect(() => {
    if (careersData) {
      setEditCareers(careersData)
    }
  }, [careersData])

  const handleSave = async () => {
    try {
      const result = await postSpecCareers(careers)

      // 3. 성공 후 처리
      if (result.data) {
        if (result.data.success) {
          setCareers([]) // 추가용 임시 상태 초기화 (필요시)
          router.refresh()
          success(t('message:post_spec_careers.success.title'), t('message:post_spec_careers.success.description'))
        } else {
          setCareers([]) // 추가용 임시 상태 초기화 (필요시)
          router.refresh()
          error(t('message:post_spec_careers.error.title'), t('message:post_spec_careers.error.description'))
        }
      }
    } catch (e) {
      error(t('message:fetch_error.title'), t('message:fetch_error.description'))
    }
  }

  return (
    <div>
      <Label
        label={t('spec:career.title')}
        type={'titleMd'}
        rightElement={
          <div className="flex gap-x-2">
            <Button customClassName={'w-[72px]'} size={'md'} onClick={handleSave}>
              {t('spec:buttons.save')}
            </Button>
            <Button
              onClick={() => {
                addCareer({
                  startDate: '',
                  endDate: '',
                  companyName: '',
                  position: '',
                  contractType: 'REGULAR',
                  highlight: '',
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
        {editCareers.map((editCareer) => (
          <EditCareerEntry
            careersData={careersData}
            initialFormOpenState={false}
            key={editCareer.careerId}
            editCareer={editCareer}
          />
        ))}
      </div>

      <Spacing height={16} />

      <div className="flex flex-col gap-y-[16px]">
        {careers.map((career, index) => (
          <CareerEntry key={index} career={career} index={index} initialFormOpenState={true} />
        ))}
      </div>

      <Spacing height={100} />
      <BottomButton handlePrev={handlePrev} isNextButtonActive={true} handleNext={handleNext} />
    </div>
  )
}
