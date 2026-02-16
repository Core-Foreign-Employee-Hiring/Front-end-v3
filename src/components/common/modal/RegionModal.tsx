import { Button, Label, Modal, TextInput } from '@/components/common'
import { getRegionLabel, WORK_REGIONS } from '@/utils/filterList'
import { Gray5XIcon } from '@/assets/svgComponents'
import { useModalStore } from '@/store/modalStore'
import { RegionType } from '@/types/job-post'
import { useTranslation } from 'react-i18next'
import { useMemo, useState } from 'react'

interface RegionModalProps {
  addRegions: (selectedRegion: RegionType) => void
  deleteRegions: (selectedRegion: RegionType) => void
  selectedRegions: RegionType[] | undefined
  onApply: () => void
  onReset: () => void
}

export default function RegionModal({
  addRegions,
  deleteRegions,
  selectedRegions,
  onReset,
  onApply,
}: RegionModalProps) {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')
  const { toggleModal, modals } = useModalStore((state) => state)
  const onClose = () => {
    toggleModal('isRegionModalOpen')
  }
  // 검색어에 따라 필터링된 리스트 생성
  const filteredRegionList = useMemo(() => {
    return WORK_REGIONS.filter((region) => {
      const translatedLabel = t(region.label).toLowerCase()
      const query = searchQuery.toLowerCase()
      return translatedLabel.includes(query)
    })
  }, [searchQuery, t])

  return (
    <Modal customClassName={'desktop:w-[860px] tablet:w-[680px]'} isOpen={modals.isRegionModalOpen} onClose={onClose}>
      <Modal.Header
        rightElement={
          <Button onClick={onReset} size={'sm'} customClassName={'w-[70px]'} variant={'outline'}>
            초기화
          </Button>
        }
      >
        <Label label={'비자선택'} type={'titleMd'} />
      </Modal.Header>

      <Modal.Body>
        <div className="flex flex-col gap-y-4">
          <TextInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            status={'default'}
            placeholder={'지역을 검색해주세요.'}
          />
          <div className="flex flex-col gap-y-4">
            {/* 필터링된 리스트만 렌더링 */}
            <section className="flex max-h-[300px] flex-wrap gap-2 overflow-y-scroll">
              {filteredRegionList.length > 0 ? (
                filteredRegionList.map((region) => {
                  const isSelected = selectedRegions?.includes(region.code)

                  return (
                    <Button
                      key={region.code}
                      size={'md'}
                      customClassName={'w-fit'}
                      // 선택되었거나 검색어와 일치하는 부분이 있을 때 강조하고 싶다면
                      // 여기서 variant나 border를 조정할 수 있습니다.
                      variant={isSelected ? 'primary' : 'outline'}
                      onClick={() => addRegions(region.code)}
                    >
                      {t(region.label)}
                    </Button>
                  )
                })
              ) : (
                <p className="text-gray4 w-full py-10 text-center font-sans">검색 결과가 없습니다.</p>
              )}
            </section>

            <hr className="border-gray2" />

            {/* 선택된 비자 배지 리스트 */}
            <section className="flex min-h-[40px] gap-x-2 overflow-x-scroll py-1">
              {selectedRegions?.map((selectedRegion) => (
                <button
                  onClick={() => {
                    deleteRegions(selectedRegion)
                  }}
                  type="button"
                  key={selectedRegion}
                  className="border-gray3 bg-gray1 kr-badge-sm text-gray5 flex cursor-pointer items-center rounded-full border px-3 py-2 whitespace-nowrap transition hover:opacity-[80%]"
                >
                  {t(getRegionLabel(selectedRegion))}
                  <Gray5XIcon width={20} height={20} />
                </button>
              ))}
            </section>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={onClose} size={'lg'} variant={'outline'} customClassName={'w-[200px]'}>
          닫기
        </Button>
        <Button onClick={onApply}>완료</Button>
      </Modal.Footer>
    </Modal>
  )
}
