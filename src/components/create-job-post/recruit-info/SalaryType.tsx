'use client'

import { DropDown } from '@/components/common'
import { SalaryEnumType } from '@/types/job-post'
import { useDropDown } from '@/hooks'
import { useCreateJobPostStore } from '@/store/createJobPostStore'
import { useEffect } from 'react'
import { convertEnumToKorSalaryTypeLabel } from '@/utils/filterList'
import { useTranslation } from 'react-i18next'

interface SalaryTypeProps {
  salaryTypeList: { content: string; key: SalaryEnumType }[]
}

export default function SalaryType({ salaryTypeList }: SalaryTypeProps) {
  const { updateCreateJobPost, createJobPost } = useCreateJobPostStore((state) => state)
  const { t } = useTranslation()

  const {
    initialValue,
    selectedDropDownContent,
    isDropDownOpen,
    setIsDropDownOpen,
    selectedDropDownHandler,
    dropDownOpenHandler,
  } = useDropDown({ initialValue: '급여 종류 선택' })

  /**
   * 컴포넌트가 마운트될 때(다시 돌아왔을 때)
   * Store에 이미 값이 있다면 드롭다운의 UI 상태를 업데이트합니다.
   */
  useEffect(() => {
    if (createJobPost.salaryType) {
      selectedDropDownHandler(t(convertEnumToKorSalaryTypeLabel(createJobPost.salaryType)))
    }
  }, [createJobPost.salaryType, selectedDropDownHandler])

  return (
    <DropDown
      className={'w-[254px]'}
      selectedValue={selectedDropDownContent}
      defaultValue={initialValue}
      isDropDownOpen={isDropDownOpen}
      dropDownOpenHandler={dropDownOpenHandler}
    >
      {salaryTypeList.map((salaryType) => (
        <DropDown.DropBoxOptionItem
          key={salaryType.key}
          onClick={() => {
            updateCreateJobPost('salaryType', salaryType.key)
            selectedDropDownHandler(salaryType.content)
            setIsDropDownOpen(false)
          }}
        >
          {salaryType.content}
        </DropDown.DropBoxOptionItem>
      ))}
    </DropDown>
  )
}
