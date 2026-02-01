'use client'

import { DropDown, Label } from '@/components/common'
import { useDropDown } from '@/hooks'
import { useRegisterStore } from '@/store/registerStore'

export default function EducationField() {
  const {
    initialValue,
    selectedDropDownContent,
    isDropDownOpen,
    setIsDropDownOpen,
    selectedDropDownHandler,
    dropDownOpenHandler,
  } = useDropDown({ initialValue: '학력을 선택해주세요.' })

  const { updateRegister } = useRegisterStore((state) => state)

  const educationList = ['고졸', '대학 재학', '대졸 및 예정', '대학원 재학', '대학원졸 및 예정']

  return (
    <div className="flex flex-col gap-y-2">
      <Label label={'학력'} type={'titleSm'} isRequired={true} />
      <DropDown
        selectedValue={selectedDropDownContent}
        defaultValue={initialValue}
        isDropDownOpen={isDropDownOpen}
        dropDownOpenHandler={dropDownOpenHandler}
      >
        {educationList.map((education) => (
          <DropDown.DropBoxOptionItem
            key={education}
            onClick={() => {
              updateRegister('education', education)
              selectedDropDownHandler(education)
              setIsDropDownOpen(false)
            }}
          >
            {education}
          </DropDown.DropBoxOptionItem>
        ))}
      </DropDown>
    </div>
  )
}
