'use client'

import { DropDown } from '@/components/common'
import { SalaryEnumType } from '@/types/job-post'
import { useDropDown } from '@/hooks'
import { useCreateJobPostStore } from '@/store/createJobPostStore'

interface SalaryTypeProps {
  salaryTypeList: { content: string; key: SalaryEnumType }[]
}

export default function SalaryType({ salaryTypeList }: SalaryTypeProps) {
  const { updateCreateJobPost } = useCreateJobPostStore((state) => state)

  const {
    initialValue,
    selectedDropDownContent,
    isDropDownOpen,
    setIsDropDownOpen,
    selectedDropDownHandler,
    dropDownOpenHandler,
  } = useDropDown({ initialValue: '급여 종류 선택' })

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
