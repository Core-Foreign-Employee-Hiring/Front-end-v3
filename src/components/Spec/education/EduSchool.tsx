'use client'

import { ChangeEvent, useMemo, useState } from 'react'
import { useSpecStore } from '@/store/specStore'
import { universityList } from '@/text/spec'
import { DropDown, Label, Spacing, TextInput } from '@/components/common'

export default function EduSchool() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const education = useSpecStore((state) => state.spec.education)
  const setEducation = useSpecStore((state) => state.setEducation)

  // 검색 결과 필터링
  const filteredUniversities = useMemo(() => {
    const searchTerm = education?.schoolName ?? ''
    if (!searchTerm.trim()) return []

    return universityList.filter((university) => university.toLowerCase().includes(searchTerm.toLowerCase()))
  }, [education?.schoolName])

  const updateField = (fieldName: keyof typeof education, value: string) => {
    setEducation({
      ...education,
      [fieldName]: value,
    })
  }

  /**
   * 직접 대학교 입력시
   */
  const handleSchoolChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: keyof typeof education
  ) => {
    const value = e.target.value
    updateField(fieldName, value)
    setIsDropdownOpen(true)
  }

  /**
   * 대학교 선택 시
   */
  const handleUniversitySelect = (university: string, fieldName: keyof typeof education) => {
    updateField(fieldName, university)
    setIsDropdownOpen(false)
  }

  return (
    <div className="w-full">
      <Label label={'학교명'} className="kr-subtitle-lg text-gray5" isRequired={true}></Label>
      <Spacing height={8} />

      <div className="relative">
        <TextInput
          inputType={'text'}
          value={education?.schoolName ?? ''}
          placeholder={'학교 이름 입력'}
          onChange={(e) => handleSchoolChange(e, 'schoolName')}
          onFocus={() => setIsDropdownOpen(true)}
        />

        {isDropdownOpen && (education?.schoolName ?? '').trim().length > 0 && (
          <DropDown.DropBoxOptionBox>
            {filteredUniversities.length > 0 ? (
              <>
                {filteredUniversities.map((university) => (
                  <DropDown.DropBoxOptionItem
                    onClick={() => handleUniversitySelect(university, 'schoolName')}
                    key={university}
                  >
                    {university}
                  </DropDown.DropBoxOptionItem>
                ))}
                <div className="bg-gray-50 px-4 py-2 text-xs text-gray-500">총 {filteredUniversities.length}개</div>
              </>
            ) : (
              <div className="px-4 py-3 text-center text-sm text-gray-500">검색 결과가 없습니다.</div>
            )}
          </DropDown.DropBoxOptionBox>
        )}
      </div>
    </div>
  )
}
