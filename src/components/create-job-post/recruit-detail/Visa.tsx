'use client'

import { Button, Label } from '@/components/common'
import { useModalStore } from '@/store/modalStore'
import { useState } from 'react'
import { VisaType } from '@/types/job-post'
import { useCreateJobPostStore } from '@/store/createJobPostStore'
import VisaModal from '@/components/common/modal/VisaModal'
import { getVisaLabel } from '@/utils/filterList'
import { useTranslation } from 'react-i18next'

export default function Visa() {
  const { isVisaModalOpen, setIsVisaModalOpen } = useModalStore((state) => state)
  const [selectedVisas, setSelectedVisas] = useState<VisaType[] | undefined>(undefined)
  const { updateCreateJobPost, createJobPost } = useCreateJobPostStore((state) => state)

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
    updateCreateJobPost('visas', selectedVisas)

    onClose()
  }

  const onReset = () => {
    setSelectedVisas(undefined)
    updateCreateJobPost('visas', undefined)
    onClose()
  }

  const onClose = () => {
    setIsVisaModalOpen(isVisaModalOpen)
  }

  return (
    <div>
      {isVisaModalOpen && (
        <VisaModal
          addVisas={addVisas}
          deleteVisas={deleteVisas}
          selectedVisas={selectedVisas}
          onApply={onApply}
          onReset={onReset}
        />
      )}
      <div className="flex flex-col gap-y-2">
        <Label label={'비자 유형'} isOption={true} />
        <div className="flex flex-col gap-y-3">
          {createJobPost.visas ? (
            <div className="flex gap-x-2">
              {createJobPost.visas?.map((visa) => (
                <button
                  type="button"
                  key={visa}
                  className="border-gray3 bg-gray1 kr-badge-sm text-gray5 flex cursor-pointer items-center rounded-full border px-3 py-2 whitespace-nowrap"
                >
                  {t(getVisaLabel(visa))}
                </button>
              ))}
            </div>
          ) : null}
          <Button variant={'outline'} size={'md'} onClick={onClose} customClassName={'w-[156px]'} buttonType={'button'}>
            비자 선택
          </Button>
        </div>
      </div>
    </div>
  )
}
