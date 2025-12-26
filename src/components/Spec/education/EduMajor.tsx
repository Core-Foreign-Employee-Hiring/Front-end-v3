'use client'

import { ChangeEvent } from 'react'
import Label from '@/components/common/Label'
import Spacing from '@/components/common/Spacing'
import TextInput from '@/components/common/TextInput'
import { useSpecStore } from '@/store/specStore'
import { Button } from '@/components/common'
import { GrayPlusIcon } from '@/assets/svgComponents'

export default function EduMajor() {
  const education = useSpecStore((state) => state.spec.education)
  const setEducation = useSpecStore((state) => state.setEducation)

  /**
   * 특정 인덱스의 전공명 수정 핸들러
   * @param index
   * @param value
   */
  const handleMajorChange = (index: number, value: string) => {
    const newMajors = [...(education.majors || [])] // 배열 복사
    newMajors[index] = value // 해당 위치 값 수정

    setEducation({
      ...education,
      majors: newMajors,
    })
  }

  /**
   * 전공 입력창 추가 핸들러
   */
  const handleAddMajor = () => {
    setEducation({
      ...education,
      majors: [...(education.majors || []), ''], // 기존 배열 끝에 빈 문자열 추가
    })
  }

  /**
   * 전공 삭제 핸들러
   * @param index
   */
  const handleRemoveMajor = (index: number) => {
    const newMajors = education.majors.filter((_, i) => i !== index)
    setEducation({
      ...education,
      majors: newMajors,
    })
  }

  return (
    <div className="w-full">
      <Label label={'전공명 및 학과'} className="kr-subtitle-lg text-gray5" isRequired={true} />
      <Spacing height={8} />

      {education.majors?.map((major, index) => (
        <div key={index} className="flex flex-col items-end">
          <TextInput
            value={major}
            onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
              handleMajorChange(index, e.target.value)
            }
            placeholder={'전공 및 학과'}
          />
          {education.majors.length > 1 && (
            <button onClick={() => handleRemoveMajor(index)} className="text-gray3 kr-caption-md mt-1 underline">
              삭제
            </button>
          )}
          <Spacing height={8} />
        </div>
      ))}

      <Button
        customClassName="w-[80px]"
        onClick={handleAddMajor}
        size={'sm'}
        variant="ghost"
        leftIcon={<GrayPlusIcon width={20} height={20} />}
      >
        추가
      </Button>
    </div>
  )
}
