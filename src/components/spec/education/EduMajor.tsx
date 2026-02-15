'use client'

import { ChangeEvent } from 'react'
import Label from '@/components/common/Label'
import Spacing from '@/components/common/Spacing'
import TextInput from '@/components/common/TextInput'
import { useSpecStore } from '@/store/specStore'
import { Button } from '@/components/common'
import { GrayPlusIcon } from '@/assets/svgComponents'

export default function EduMajor() {
  const education = useSpecStore((state) => state.education)
  const setEducation = useSpecStore((state) => state.setEducation)

  // 1. education이 null이면 렌더링하지 않거나 기본값 처리 (Early Return)
  if (!education) return null

  /**
   * 특정 인덱스의 전공명 수정 핸들러
   */
  const handleMajorChange = (index: number, value: string) => {
    // 위에서 null 체크를 했으므로 education은 반드시 존재함
    const newMajors = [...education.majors]
    newMajors[index] = value

    setEducation({
      ...education, // 이제 TypeScript가 education이 객체임을 확신함
      majors: newMajors,
    })
  }

  /**
   * 전공 입력창 추가 핸들러
   */
  const handleAddMajor = () => {
    setEducation({
      ...education,
      majors: [...education.majors, ''],
    })
  }

  /**
   * 전공 삭제 핸들러
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

      {education.majors.map((major, index) => (
        <div key={index} className="flex flex-col items-end">
          <TextInput
            value={major}
            onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
              handleMajorChange(index, e.target.value)
            }
            placeholder={'전공 및 학과'}
          />
          {education.majors.length > 1 && (
            <button
              type="button"
              onClick={() => handleRemoveMajor(index)}
              className="text-gray3 kr-caption-md mt-1 underline"
            >
              삭제
            </button>
          )}
          <Spacing height={8} />
        </div>
      ))}

      <Button
        customClassName="w-[85px]"
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
