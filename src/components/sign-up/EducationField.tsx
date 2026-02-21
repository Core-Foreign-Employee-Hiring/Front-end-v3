'use client'

import { DropDown, Label } from '@/components/common'
import { useDropDown } from '@/hooks'
import { useRegisterStore } from '@/store/registerStore'
import { useTranslation } from 'react-i18next'

export default function EducationField() {
  const { t } = useTranslation('signup')
  const {
    initialValue,
    selectedDropDownContent,
    isDropDownOpen,
    setIsDropDownOpen,
    selectedDropDownHandler,
    dropDownOpenHandler,
  } = useDropDown({ initialValue: t('step2.educationField.placeholder') })

  const { updateRegister } = useRegisterStore((state) => state)

  const educationList = [
    t('step2.educationField.content.highSchoolGraduate'),
    t('step2.educationField.content.universityEnrolled'),
    t('step2.educationField.content.universityGraduateOrExpected'),
    t('step2.educationField.content.graduateSchoolEnrolled'),
    t('step2.educationField.content.graduateSchoolGraduateOrExpected'),
  ]

  return (
    <div className="flex flex-col gap-y-2">
      <Label label={t('step2.educationField.label')} type={'titleSm'} isRequired={true} />
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
