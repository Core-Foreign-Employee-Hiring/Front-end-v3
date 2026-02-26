'use client'

import { Button, Label, TextInput } from '@/components/common'
import { VisaType } from '@/types/job-post'
import { useTranslation } from 'react-i18next'
import { useMemo, useState } from 'react'
import { useModalStore } from '@/store/modalStore'
import { getVisaLabel, VISA_LIST } from '@/utils/filterList'
import { Gray5XIcon } from '@/assets/svgComponents'

interface MobileVisaModalProps {
  addVisas: (selectedVisa: VisaType) => void
  deleteVisas: (selectedVisa: VisaType) => void
  selectedVisas: VisaType[] | undefined
  onApply: () => void
  onReset: () => void
}

export default function MobileVisaModal({
  addVisas,
  deleteVisas,
  selectedVisas,
  onReset,
  onApply,
}: MobileVisaModalProps) {
  const { t } = useTranslation(['filter', 'modal'])
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
    <div className="desktop:hidden tablet:hidden fixed inset-0 z-80 flex h-full w-full flex-col gap-y-[24px] overflow-y-auto bg-white p-5">
      <section className="flex items-center justify-between">
        <Label label={t('modal:visa.header')} type={'titleMd'} />
        <Gray5XIcon className="cursor-pointer" onClick={onClose} width={24} height={24} />
      </section>
      <div className="flex flex-col gap-y-4">
        <TextInput
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          status={'default'}
          placeholder={t('modal:visa.body.placeholder')}
        />
        <div className="flex flex-col gap-y-4">
          {/* 필터링된 리스트만 렌더링 */}
          <section className="flex flex-wrap gap-2 overflow-y-scroll">
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
              <p className="text-gray4 w-full py-10 text-center font-sans">
                {t('modal:visa.body.message.no_search_result')}
              </p>
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

      <div className="fixed bottom-0 left-0 z-80 flex w-full gap-x-2 bg-white px-5 py-[24px]">
        <Button onClick={onReset} size={'lg'} variant={'outline'}>
          {t('modal:footer_buttons.reset')}
        </Button>
        <Button onClick={onApply}>{t('modal:footer_buttons.completed')}</Button>
      </div>
    </div>
  )
}
