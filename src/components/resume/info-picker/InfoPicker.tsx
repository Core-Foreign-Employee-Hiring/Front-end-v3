'use client'

import { useState } from 'react'
import InfoPickerItem from '@/components/resume/info-picker/InfoPickerItem'
import { CheckIcon, UncheckIcon } from '@/assets/svgComponents' // UnCheckIcon 추가 가정

export default function InfoPicker() {
  const infoList = ['자기소개', '학력', '자격증', '어학 능력', '경력', '수상', '기타 활동', '사진', 'URL']

  // 1. 선택된 항목들을 담는 리스트 상태
  const [selectedList, setSelectedList] = useState<string[]>([])

  // 2. 전체 선택 여부 확인
  const isAllSelected = selectedList.length === infoList.length

  // 3. 전체 선택/해제 핸들러
  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedList([]) // 이미 모두 선택되었다면 전체 해제
    } else {
      setSelectedList([...infoList]) // 아니라면 전체 추가
    }
  }

  // 4. 개별 항목 토글 핸들러
  const handleToggle = (item: string) => {
    setSelectedList(
      (prev) =>
        prev.includes(item)
          ? prev.filter((i) => i !== item) // 이미 있으면 제거
          : [...prev, item] // 없으면 추가
    )
  }

  return (
    <div className="flex flex-col gap-y-3">
      {/* 모두 선택 버튼 */}
      <div className="flex w-fit cursor-pointer items-center gap-x-2" onClick={handleSelectAll}>
        {isAllSelected ? (
          <CheckIcon width={20} height={20} className="text-main-500" />
        ) : (
          <UncheckIcon width={20} height={20} />
        )}
        <p className={`kr-subtitle-md ${isAllSelected ? 'text-main-500' : 'text-gray5'}`}>모두 선택</p>
      </div>

      {/* 항목 그리드 */}
      <div className="grid grid-cols-3 gap-3">
        {' '}
        {/* gap 추가 추천 */}
        {infoList.map((info) => (
          <InfoPickerItem
            key={info}
            content={info}
            isSelected={selectedList.includes(info)} // 선택 여부 전달
            onClick={() => handleToggle(info)} // 클릭 함수 전달
          />
        ))}
      </div>
    </div>
  )
}
