'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { VISA_LIST } from '@/utils/filterList'
import { DropDownGray3Icon, DropDownGray4Icon, SearchIcon } from '@/assets/svgComponents'
import { useTranslation } from 'react-i18next'
import { useRegisterStore } from '@/store/registerStore'
import DropDown from '../common/DropDown'
import { Label } from '@/components/common'
import { VisaType } from '@/types/job-post'

export default function VisaField() {
  const [isDropBoxOpen, setIsDropBoxOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const { registerData, updateRegister } = useRegisterStore((state) => state)
  const { t } = useTranslation(['signup', 'filter'])

  // 외부 클릭 감지를 위한 ref
  const containerRef = useRef<HTMLDivElement>(null)

  // 외부 클릭 시 드롭다운을 닫는 로직
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsDropBoxOpen(false)
        setSearchValue('')
      }
    }

    if (isDropBoxOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropBoxOpen])

  // 검색어에 따라 필터링된 비자 리스트
  const filteredList = useMemo(() => {
    if (!searchValue) return VISA_LIST
    return VISA_LIST.filter((visa) => t(visa.i18nKey).toLowerCase().includes(searchValue.toLowerCase()))
  }, [searchValue, t])

  // 현재 선택된 비자의 라벨을 찾는 함수
  const getSelectedLabel = () => {
    if (!registerData?.visa) return t('signup:step2.visaField.placeholder')
    const found = VISA_LIST.find((visa) => visa.code === registerData.visa)
    return found?.i18nKey || registerData.visa
  }

  const handleSelectVisa = (visaCode: VisaType) => {
    updateRegister('visa', visaCode)
    setIsDropBoxOpen(false)
    setSearchValue('')
  }

  return (
    <div className="flex flex-col gap-y-2" ref={containerRef}>
      <Label label={t('signup:step2.visaField.label')} isRequired={true} type={'titleSm'} />

      <div className="relative">
        {isDropBoxOpen ? (
          // 검색창 활성화 상태
          <div className="border-gray2 flex h-[52px] items-center gap-x-2 rounded-[12px] border bg-white px-4 py-3">
            <SearchIcon width={24} height={24} />
            <input
              autoFocus
              className="w-full outline-none"
              value={searchValue}
              placeholder={t('signup:step2.visaField.searchVisaPlaceholder')}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        ) : (
          // 드롭박스가 닫혀있을 때: 선택된 값 표시
          <section
            onClick={() => setIsDropBoxOpen(true)}
            className="border-gray2 flex h-[52px] cursor-pointer items-center justify-between rounded-[12px] border bg-white px-4 py-3"
          >
            <p className={`${registerData?.visa ? 'text-black' : 'text-gray4'} button`}>{t(getSelectedLabel())}</p>
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
              filteredList.map((visa) => (
                <DropDown.DropBoxOptionItem key={visa.code} onClick={() => handleSelectVisa(visa.code)}>
                  {t(visa.i18nKey)}
                </DropDown.DropBoxOptionItem>
              ))
            ) : (
              <div className="text-gray4 flex h-[60px] items-center justify-center px-4">
                {t('signup:step2.visaField.noSearchResultMessage')}
              </div>
            )}
          </DropDown.DropBoxOptionBox>
        )}
      </div>
    </div>
  )
}
