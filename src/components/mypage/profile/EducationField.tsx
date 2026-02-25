'use client'

import { useEffect } from 'react' // 1. useEffect 추가
import { DropDown, Label } from '@/components/common'
import { useDropDown } from '@/hooks'
import { useModifyProfileStore } from '@/store/modifyProfileStore'
import { useTranslation } from 'react-i18next'

export default function EducationField() {
  const { t } = useTranslation('my')
  const {
    initialValue,
    selectedDropDownContent,
    isDropDownOpen,
    setIsDropDownOpen,
    selectedDropDownHandler,
    dropDownOpenHandler,
  } = useDropDown({ initialValue: t('profile.education_field.placeholder') })

  const { updateProfile, modifyProfileData } = useModifyProfileStore((state) => state)

  const educationList = [
    t('profile.education_field.list.high_school'),
    t('profile.education_field.list.university_attending'),
    t('profile.education_field.list.university_graduate'),
    t('profile.education_field.list.graduate_school_attending'),
    t('profile.education_field.list.graduate_school_graduate'),
  ]

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
      <Label label={t('profile.education_field.label')} type={'titleSm'} isRequired={true} />
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
