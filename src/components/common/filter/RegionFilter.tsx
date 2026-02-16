import { DropDownGray3Icon, DropDownGray4Icon } from '@/assets/svgComponents'
import RegionModal from '@/components/common/modal/RegionModal'
import { useModalStore } from '@/store/modalStore'
import { useState } from 'react'
import { RegionType } from '@/types/job-post'
import { useFilterStore } from '@/store/filterStore'
import { useTranslation } from 'react-i18next'

export default function RegionFilter() {
  const { modals, toggleModal } = useModalStore((state) => state)
  const [selectedRegions, setSelectedRegions] = useState<RegionType[] | undefined>(undefined)
  const { selectedRegionFilterContentList, setSelectedRegionFilterList } = useFilterStore((state) => state)

  const { t } = useTranslation()

  const deleteRegions = (selectedRegion: RegionType) => {
    setSelectedRegions((prev) => prev?.filter((region) => region !== selectedRegion))
  }

  const addRegions = (selectedRegion: RegionType) => {
    setSelectedRegions((prev) => {
      const current = prev || []

      if (current.includes(selectedRegion)) {
        return current.filter((region) => region !== selectedRegion)
      }

      return [...current, selectedRegion]
    })
  }

  const onApply = () => {
    setSelectedRegionFilterList(selectedRegions)

    onClose()
  }

  const onReset = () => {
    setSelectedRegions([])
    setSelectedRegionFilterList([])

    onClose()
  }

  const onClose = () => {
    toggleModal('isRegionModalOpen')
  }

  return (
    <div>
      {modals.isRegionModalOpen && (
        <RegionModal
          onReset={onReset}
          onApply={onApply}
          selectedRegions={selectedRegions}
          addRegions={addRegions}
          deleteRegions={deleteRegions}
        />
      )}
      <button
        onClick={() => {
          toggleModal('isRegionModalOpen')
        }}
        className="hover:border-gray3 border-gray2 flex h-[36px] cursor-pointer items-center gap-x-2 rounded-[12px] border px-4 whitespace-nowrap transition hover:duration-75"
      >
        <div className="kr-button text-gray5 flex items-center gap-x-1">
          {t('recruitHome.filters.region')}
          {selectedRegionFilterContentList?.length === 0 ? null : (
            <div className="kr-badge-sm bg-main-500 flex h-[20px] w-[20px] items-center justify-center rounded-full text-white">
              {selectedRegionFilterContentList?.length}
            </div>
          )}
        </div>
        {modals.isRegionModalOpen ? (
          <DropDownGray3Icon width={20} height={20} />
        ) : (
          <DropDownGray4Icon width={20} height={20} />
        )}
      </button>
    </div>
  )
}
