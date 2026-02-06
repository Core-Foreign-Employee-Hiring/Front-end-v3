'use client'

import { useEffect } from 'react' // 1. useEffect 추가
import { DropDown, Label } from '@/components/common'
import { useDropDown } from '@/hooks'
import { useModifyProfileStore } from '@/store/modifyProfileStore'

export default function EducationField() {
  const {
    initialValue,
    selectedDropDownContent,
    isDropDownOpen,
    setIsDropDownOpen,
    selectedDropDownHandler,
    dropDownOpenHandler,
  } = useDropDown({ initialValue: '학력을 선택해주세요.' })

  const { updateProfile, modifyProfileData } = useModifyProfileStore((state) => state)

  const educationList = ['고졸', '대학 재학', '대졸 및 예정', '대학원 재학', '대학원졸 및 예정']

  // 2. 초기 데이터 동기화 (Store -> DropDown State)
  useEffect(() => {
    const savedEducation = modifyProfileData.education
    // 스토어에 데이터가 있고, 기본 placeholder와 다를 때만 실행
    if (savedEducation && educationList.includes(savedEducation)) {
      selectedDropDownHandler(savedEducation)
    }
    // 최초 마운트 시에만 실행
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
              updateProfile('education', education)
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
