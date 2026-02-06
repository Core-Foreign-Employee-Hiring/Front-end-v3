'use client'

import { useMemo, useState } from 'react'
import { VISA_LIST } from '@/utils/filterList'
import { DropDownGray3Icon, SearchIcon } from '@/assets/svgComponents'
import { useTranslation } from 'react-i18next'
import { useRegisterStore } from '@/store/registerStore'
import DropDown from '../common/DropDown'
import { Label } from '@/components/common'
import { VisaType } from '@/types/job-post'

export default function VisaField() {
  const [isDropBoxOpen, setIsDropBoxOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const { registerData, updateRegister } = useRegisterStore((state) => state)
  const { t } = useTranslation()

  // 검색어에 따라 필터링된 비자 리스트
  const filteredList = useMemo(() => {
    if (!searchValue) return VISA_LIST
    return VISA_LIST.filter((visa) => visa.i18nKey.toLowerCase().includes(searchValue.toLowerCase()))
  }, [searchValue])

  // 현재 선택된 비자의 라벨을 찾는 함수
  const getSelectedLabel = () => {
    if (!registerData?.visa) return t('signUp.visa.placeholder')
    const found = VISA_LIST.find((visa) => visa.code === registerData.visa)
    return found?.i18nKey || registerData.visa
  }

  const handleSelectVisa = (visaCode: VisaType) => {
    updateRegister('visa', visaCode)
    setIsDropBoxOpen(false)
    setSearchValue('')
  }

  // Input 컨테이너 클릭 시 드롭박스 토글
  const handleInputContainerClick = () => {
    setIsDropBoxOpen(!isDropBoxOpen)
  }

  return (
    <div className="flex flex-col gap-y-2">
      <Label label={'비자'} isRequired={true} type={'titleSm'} />
      <div onClick={handleInputContainerClick} className="relative">
        {isDropBoxOpen ? (
          <div
            onClick={(e) => e.stopPropagation()}
            className="border-gray2 flex h-[52px] items-center gap-x-2 rounded-[12px] border px-4 py-3"
          >
            <SearchIcon width={24} height={24} />
            <input
              className="w-full outline-none"
              value={searchValue}
              placeholder={'비자를 선택해주세요.'}
              onChange={(e) => {
                setSearchValue(e.target.value)
              }}
            />
          </div>
        ) : (
          // 드롭박스가 닫혀있을 때: 선택된 값 표시
          <section
            onClick={() => setIsDropBoxOpen(true)}
            className="border-gray2 flex h-[52px] items-center justify-between rounded-[12px] border px-4 py-3"
          >
            <p className={`${registerData?.visa ? 'text-black' : 'text-gray4'} button`}>{t(getSelectedLabel())}</p>
            <DropDownGray3Icon width={20} height={20} />
          </section>
        )}

        {/* 드롭다운 리스트 */}
        {isDropBoxOpen && (
          <DropDown.DropBoxOptionBox>
            {filteredList.length > 0 ? (
              filteredList.map((visa) => (
                <DropDown.DropBoxOptionItem key={visa.code} onClick={() => handleSelectVisa(visa.code)}>
                  {visa.i18nKey}
                </DropDown.DropBoxOptionItem>
              ))
            ) : (
              <div className="text-gray4 flex h-[60px] items-center justify-center px-4">
                {t('signUp.visa.noSearchResultMessage')}
              </div>
            )}
          </DropDown.DropBoxOptionBox>
        )}
      </div>
    </div>
  )
}
