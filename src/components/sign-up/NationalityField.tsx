'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { NATIONALITY_LIST } from '@/utils/filterList'
import { DropDownGray3Icon, DropDownGray4Icon, SearchIcon } from '@/assets/svgComponents'
import { useTranslation } from 'react-i18next'
import { useRegisterStore } from '@/store/registerStore'
import DropDown from '../common/DropDown'
import { Label } from '@/components/common'
import { NationalityType } from '@/types/job-post'

export default function NationalityField() {
  const [isDropBoxOpen, setIsDropBoxOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const { registerData, updateRegister } = useRegisterStore((state) => state)
  const { t } = useTranslation(['filter', 'signup'])

  // 외부 클릭 감지를 위한 ref
  const containerRef = useRef<HTMLDivElement>(null)

  // 외부 클릭 감지 로직
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // 클릭된 요소가 containerRef 내부에 포함되어 있지 않다면 닫기
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsDropBoxOpen(false)
        setSearchValue('')
      }
    }

    // 드롭다운이 열려있을 때만 이벤트 리스너 등록
    if (isDropBoxOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    // 클린업 함수: 컴포넌트 언마운트 시 또는 드롭다운이 닫힐 때 리스너 제거
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropBoxOpen])

  // 검색어에 따라 필터링된 국적 리스트
  const filteredList = useMemo(() => {
    if (!searchValue) return NATIONALITY_LIST
    return NATIONALITY_LIST.filter((nationality) => nationality.label.toLowerCase().includes(searchValue.toLowerCase()))
  }, [searchValue])

  // 현재 선택된 국적의 라벨을 찾는 함수
  const getSelectedLabel = () => {
    if (!registerData?.nationality) return t('signup:step2.nationalityField.placeholder')
    const found = NATIONALITY_LIST.find((nationality) => nationality.code === registerData.nationality)
    return found?.label || registerData.nationality
  }

  const handleSelectNationality = (code: NationalityType) => {
    updateRegister('nationality', code)
    setIsDropBoxOpen(false)
    setSearchValue('')
  }

  return (
    <div className="flex flex-col gap-y-2" ref={containerRef}>
      <Label label={t('signup:step2.nationalityField.label')} isRequired={true} type={'titleSm'} />

      <div className="relative">
        {isDropBoxOpen ? (
          // 검색창이 열려있을 때
          <div className="border-gray2 flex h-[52px] items-center gap-x-2 rounded-[12px] border bg-white px-4 py-3">
            <SearchIcon width={24} height={24} />
            <input
              autoFocus
              className="w-full outline-none"
              value={searchValue}
              placeholder={t('signup:step2.nationalityField.placeholder')}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        ) : (
          // 드롭박스가 닫혀있을 때: 선택된 값 표시
          <section
            onClick={() => setIsDropBoxOpen(true)}
            className="border-gray2 flex h-[52px] cursor-pointer items-center justify-between rounded-[12px] border bg-white px-4 py-3"
          >
            <p className={`${registerData?.nationality ? 'text-black' : 'text-gray4'} button`}>
              {t(getSelectedLabel())}
            </p>
            {isDropBoxOpen ? (
              <DropDownGray3Icon width={20} height={20} />
            ) : (
              <DropDownGray4Icon width={20} height={20} />
            )}
          </section>
        )}

        {/* 드롭다운 리스트 */}
        {isDropBoxOpen && (
          <DropDown.DropBoxOptionBox>
            {filteredList.length > 0 ? (
              filteredList.map((nationality) => (
                <DropDown.DropBoxOptionItem
                  key={nationality.code}
                  onClick={() => handleSelectNationality(nationality.code)}
                >
                  {t(nationality.label)}
                </DropDown.DropBoxOptionItem>
              ))
            ) : (
              <div className="text-gray4 flex h-[60px] items-center justify-center px-4">
                {t('signup:step2.nationalityField.noSearchResultMessage')}
              </div>
            )}
          </DropDown.DropBoxOptionBox>
        )}
      </div>
    </div>
  )
}
