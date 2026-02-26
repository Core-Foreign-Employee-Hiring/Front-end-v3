'use client'

import { useEffect, useRef } from 'react' // 1. useRef, useEffect 추가
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

  // 2. 외부 클릭 감지를 위한 ref 생성
  const containerRef = useRef<HTMLDivElement>(null)

  // 3. 외부 클릭 시 닫기 로직 추가
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsDropDownOpen(false)
      }
    }

    if (isDropDownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropDownOpen, setIsDropDownOpen])

  const educationList = [
    t('step2.educationField.content.highSchoolGraduate'),
    t('step2.educationField.content.universityEnrolled'),
    t('step2.educationField.content.universityGraduateOrExpected'),
    t('step2.educationField.content.graduateSchoolEnrolled'),
    t('step2.educationField.content.graduateSchoolGraduateOrExpected'),
  ]

  return (
    // 4. 최상위 div에 ref 연결
    <div className="flex flex-col gap-y-2" ref={containerRef}>
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
