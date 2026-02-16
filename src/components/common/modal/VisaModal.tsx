'use client'

import { VisaType } from '@/types/job-post'
import { Button, Label, Modal, TextInput } from '@/components/common'
import { getVisaLabel, VISA_LIST } from '@/utils/filterList'
import { Gray5XIcon } from '@/assets/svgComponents'
import { useTranslation } from 'react-i18next'
import { useMemo, useState } from 'react' // useMemo 추가
import { useModalStore } from '@/store/modalStore'

interface VisaModalProps {
  addVisas: (selectedVisa: VisaType) => void
  deleteVisas: (selectedVisa: VisaType) => void
  selectedVisas: VisaType[] | undefined
  onApply: () => void
  onReset: () => void
}

export default function VisaModal({ addVisas, deleteVisas, selectedVisas, onReset, onApply }: VisaModalProps) {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')
  const { toggleModal, modals } = useModalStore((state) => state)

  const onClose = () => {
    toggleModal('isVisaModalOpen')
  }

  // 검색어에 따라 필터링된 리스트 생성
  const filteredVisaList = useMemo(() => {
    return VISA_LIST.filter((visa) => {
      const translatedLabel = t(visa.i18nKey).toLowerCase()
      const query = searchQuery.toLowerCase()
      return translatedLabel.includes(query)
    })
  }, [searchQuery, t])

  return (
    <Modal customClassName={'desktop:w-[860px] tablet:w-[680px]'} isOpen={modals.isVisaModalOpen} onClose={onClose}>
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
            placeholder={'비자를 검색해주세요.'}
          />
          <div className="flex flex-col gap-y-4">
            {/* 필터링된 리스트만 렌더링 */}
            <section className="flex max-h-[300px] flex-wrap gap-2 overflow-y-scroll">
              {filteredVisaList.length > 0 ? (
                filteredVisaList.map((visa) => {
                  const isSelected = selectedVisas?.includes(visa.code)

                  return (
                    <Button
                      key={visa.code}
                      size={'md'}
                      customClassName={'w-fit'}
                      // 선택되었거나 검색어와 일치하는 부분이 있을 때 강조하고 싶다면
                      // 여기서 variant나 border를 조정할 수 있습니다.
                      variant={isSelected ? 'primary' : 'outline'}
                      onClick={() => addVisas(visa.code)}
                    >
                      {t(visa.i18nKey)}
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
              {selectedVisas?.map((selectedVisa) => (
                <button
                  onClick={() => {
                    deleteVisas(selectedVisa)
                  }}
                  type="button"
                  key={selectedVisa}
                  className="border-gray3 bg-gray1 kr-badge-sm text-gray5 flex cursor-pointer items-center rounded-full border px-3 py-2 whitespace-nowrap transition hover:opacity-[80%]"
                >
                  {t(getVisaLabel(selectedVisa))}
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
