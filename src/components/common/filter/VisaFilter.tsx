'use client'

import { DropDownGray3Icon, DropDownGray4Icon } from '@/assets/svgComponents'
import { useModalStore } from '@/store/modalStore'
import VisaModal from '@/components/common/modal/VisaModal'
import { useState } from 'react'
import { VisaType } from '@/types/job-post'
import { useTranslation } from 'react-i18next'
import { useFilterStore } from '@/store/filterStore'
import MobileVisaModal from '@/components/common/modal/mobile/MobileVisaModal'

export default function VisaFilter() {
  const { modals, toggleModal } = useModalStore((state) => state)

  const [selectedVisas, setSelectedVisas] = useState<VisaType[] | undefined>(undefined)
  const { selectedVisaFilterContentList, setSelectedVisaFilterList } = useFilterStore((state) => state)
  const { t } = useTranslation()

  const deleteVisas = (selectedVisa: VisaType) => {
    setSelectedVisas((prev) => prev?.filter((visa) => visa !== selectedVisa))
  }

  const addVisas = (selectedVisa: VisaType) => {
    setSelectedVisas((prev) => {
      const current = prev || []

      if (current.includes(selectedVisa)) {
        return current.filter((visa) => visa !== selectedVisa)
      }

      return [...current, selectedVisa]
    })
  }

  const onApply = () => {
    setSelectedVisaFilterList(selectedVisas)

    onClose()
  }

  const onReset = () => {
    setSelectedVisas([])
    setSelectedVisaFilterList([])
    onClose()
  }

  const onClose = () => {
    toggleModal('isVisaModalOpen')
  }

  return (
    <div>
      {modals.isVisaModalOpen && (
        <VisaModal
          addVisas={addVisas}
          deleteVisas={deleteVisas}
          onReset={onReset}
          selectedVisas={selectedVisas}
          onApply={onApply}
        />
      )}
      {modals.isVisaModalOpen && (
        <MobileVisaModal
          addVisas={addVisas}
          deleteVisas={deleteVisas}
          onReset={onReset}
          selectedVisas={selectedVisas}
          onApply={onApply}
        />
      )}
      <button
        onClick={() => {
          toggleModal('isVisaModalOpen')
        }}
        className="hover:border-gray3 border-gray2 flex h-[36px] cursor-pointer items-center gap-x-2 rounded-[12px] border px-4 whitespace-nowrap transition hover:duration-75"
      >
        <div className="kr-button text-gray5 flex items-center gap-x-1">
          {t('recruitHome.filters.visa')}
          {selectedVisaFilterContentList?.length === 0 ? null : (
            <div className="kr-badge-sm bg-main-500 flex h-[20px] w-[20px] items-center justify-center rounded-full text-white">
              {selectedVisaFilterContentList?.length}
            </div>
          )}
        </div>
        {modals.isVisaModalOpen ? (
          <DropDownGray3Icon width={20} height={20} />
        ) : (
          <DropDownGray4Icon width={20} height={20} />
        )}
      </button>
    </div>
  )
}
