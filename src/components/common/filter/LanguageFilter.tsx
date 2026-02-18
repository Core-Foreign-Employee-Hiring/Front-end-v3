import { DropDownGray3Icon, DropDownGray4Icon } from '@/assets/svgComponents'
import LanguageModal from '@/components/common/modal/LanguageModal'
import { useModalStore } from '@/store/modalStore'
import { useState } from 'react'
import { LanguageType } from '@/types/job-post'
import { useTranslation } from 'react-i18next'
import { useFilterStore } from '@/store/filterStore'
import MobileLanguageModal from '@/components/common/modal/mobile/MobileLanguageModal'

export default function LanguageFilter() {
  const { modals, toggleModal } = useModalStore((state) => state)
  const [selectedLanguages, setSelectedLanguages] = useState<LanguageType[] | undefined>(undefined)
  const { selectedLanguageFilterContentList, setSelectedLanguageFilterList } = useFilterStore((state) => state)

  const { t } = useTranslation()

  const deleteLanguages = (selectedLanguage: LanguageType) => {
    setSelectedLanguages((prev) => prev?.filter((language) => language !== selectedLanguage))
  }

  const addLanguages = (selectedLanguage: LanguageType) => {
    setSelectedLanguages((prev) => {
      const current = prev || []

      if (current.includes(selectedLanguage)) {
        return current.filter((language) => language !== selectedLanguage)
      }

      return [...current, selectedLanguage]
    })
  }

  const onApply = () => {
    setSelectedLanguageFilterList(selectedLanguages)

    onClose()
  }

  const onReset = () => {
    setSelectedLanguages([])
    setSelectedLanguageFilterList([])

    onClose()
  }

  const onClose = () => {
    toggleModal('isLanguageModalOpen')
  }

  return (
    <div>
      {modals.isLanguageModalOpen && (
        <LanguageModal
          addLanguages={addLanguages}
          onReset={onReset}
          deleteLanguages={deleteLanguages}
          selectedLanguages={selectedLanguages}
          onApply={onApply}
        />
      )}
      {modals.isLanguageModalOpen && (
        <MobileLanguageModal
          addLanguages={addLanguages}
          onReset={onReset}
          deleteLanguages={deleteLanguages}
          selectedLanguages={selectedLanguages}
          onApply={onApply}
        />
      )}
      <button
        onClick={() => {
          toggleModal('isLanguageModalOpen')
        }}
        className="hover:border-gray3 border-gray2 flex h-[36px] cursor-pointer items-center gap-x-2 rounded-[12px] border px-4 whitespace-nowrap transition hover:duration-75"
      >
        <div className="kr-button text-gray5 flex items-center gap-x-1">
          {t('recruitHome.filters.language')}
          {selectedLanguageFilterContentList?.length === 0 ? null : (
            <div className="kr-badge-sm bg-main-500 flex h-[20px] w-[20px] items-center justify-center rounded-full text-white">
              {selectedLanguageFilterContentList?.length}
            </div>
          )}
        </div>
        {modals.isLanguageModalOpen ? (
          <DropDownGray3Icon width={20} height={20} />
        ) : (
          <DropDownGray4Icon width={20} height={20} />
        )}
      </button>
    </div>
  )
}
