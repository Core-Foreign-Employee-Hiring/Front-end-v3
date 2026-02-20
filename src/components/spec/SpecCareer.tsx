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

interface SpecCareerProps {
  careersData: SpecCareerType[] | null | undefined
}

export default function SpecCareer({ careersData }: SpecCareerProps) {
  const { t } = useTranslation(['spec'])
  const router = useRouter()
  const { handleNext, handlePrev, careers, isActive } = useSpecCareer()

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
      if (result.success) {
        setCareers([]) // 추가용 임시 상태 초기화 (필요시)
        router.refresh()
        alert('모든 자격증이 성공적으로 저장되었습니다.')
      }
    } catch (error) {
      console.error('저장 과정 중 오류 발생:', error)
      alert('저장 중 오류가 발생했습니다. 다시 시도해주세요.')
    }
  }

  return (
    <div>
      <Label
        label={t('career.title')}
        type={'titleMd'}
        rightElement={
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
            {t('buttons.add')}
          </Button>
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

      <Button onClick={handleSave}>{t('buttons.save')}</Button>

      <Spacing height={100} />
      <BottomButton handlePrev={handlePrev} isNextButtonActive={isActive} handleNext={handleNext} />
    </div>
  )
}
