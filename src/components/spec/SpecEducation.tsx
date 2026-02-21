'use client'

import { useEffect, useState } from 'react'
import { Main5000PlusIcon } from '@/assets/svgComponents'
import { Button, Label, Spacing } from '../common'
import { AddEduForm, BottomButton } from '@/components/spec/index'
import { useSpecEducation } from '@/hooks'
import { SpecEducationType } from '@/types/spec'
import EducationItem from '@/components/spec/education/EducationItem'
import { useSpecStore } from '@/store/specStore'
import { useTranslation } from 'react-i18next'

interface SpecEducationProps {
  educationData: SpecEducationType | undefined | null
}

export default function SpecEducation({ educationData }: SpecEducationProps) {
  const { handleAddEducation, handleNextStep, isActive } = useSpecEducation()
  const { education, setEducation } = useSpecStore() // 스토어에서 전체 데이터를 세팅하는 함수

  const { t } = useTranslation(['spec'])

  useEffect(() => {
    console.log('education', education)
  }, [education])

  // 1. 초기 폼 오픈 상태 설정
  const [isEducationFormOpen, setIsEducationFormOpen] = useState(!educationData)

  // 2. 초기 렌더링 시 데이터가 있다면 스토어에 동기화
  useEffect(() => {
    if (educationData) {
      setEducation(educationData)
    } else {
      handleAddEducation()
    }
  }, [educationData, setEducation])

  // 추가 버튼 클릭 시 (새로 작성)
  const onClickAddButton = () => {
    setIsEducationFormOpen(true)
    handleAddEducation() // 스토어 초기화 및 작성 준비 로직 (훅 내부 구현에 따름)
  }

  // 수정 버튼 클릭 시 (EducationItem 내부에서 호출할 용도)
  const handleEdit = () => {
    setIsEducationFormOpen(true)
    // 이미 useEffect에서 데이터를 채웠으므로 폼만 열면 기존 데이터가 보입니다.
  }

  const onClose = () => {
    setIsEducationFormOpen(!isEducationFormOpen)
  }

  return (
    <div>
      <Label
        label={t('education.title')}
        type={'titleMd'}
        rightElement={
          // 데이터가 없고 폼이 닫혀있을 때만 '추가' 버튼 노출
          !educationData && !isEducationFormOpen ? (
            <Button
              onClick={onClickAddButton}
              variant={'secondary'}
              size={'md'}
              customClassName={'w-fit'}
              leftIcon={<Main5000PlusIcon width={20} height={20} />}
            >
              {t('buttons.add')}
            </Button>
          ) : null
        }
      />
      <Spacing height={16} />

      {/* 3. 조건부 렌더링 */}
      {isEducationFormOpen ? (
        <AddEduForm educationData={educationData} onClose={onClose} />
      ) : (
        // 데이터가 있을 때만 Item 표시, 수정 버튼 클릭 시 handleEdit 실행
        educationData && <EducationItem education={educationData} onEdit={handleEdit} />
      )}

      <Spacing height={100} />
      <BottomButton isNextButtonActive={true} handleNext={handleNextStep} />
    </div>
  )
}
