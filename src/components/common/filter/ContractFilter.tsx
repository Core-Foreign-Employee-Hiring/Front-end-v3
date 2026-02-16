'use client'

import { convertEnumToKorContractTypeLabel } from '@/utils/job-post'
import { DropDownGray3Icon, DropDownGray4Icon } from '@/assets/svgComponents'
import { useModalStore } from '@/store/modalStore'
import { useTranslation } from 'react-i18next'
import ContractModal from '@/components/common/modal/ContractModal'
import { useFilterStore } from '@/store/filterStore'
import { ContractEnumType } from '@/types/spec'
import { useState } from 'react'
import { CarrerType } from '@/types/job-post'

export default function ContractFilter() {
  const { toggleModal, modals } = useModalStore((state) => state)
  const { selectedContractFilter, setContractFilter } = useFilterStore((state) => state)
  const { t } = useTranslation()
  const [selectedContract, setSelectedContract] = useState<ContractEnumType | CarrerType | undefined>(undefined)

  const deleteContract = () => {
    setSelectedContract(undefined)
  }

  const addContract = (selectedContract: ContractEnumType | CarrerType) => {
    setSelectedContract((prev) => (prev === selectedContract ? undefined : selectedContract))
  }

  const onContractFilterApply = () => {
    setContractFilter(selectedContract)
    onContractClose()
  }

  const onContractFilterReset = () => {
    setSelectedContract(undefined)
    setContractFilter(undefined)
    onContractClose()
  }

  const onContractClose = () => {
    toggleModal('isContractModalOpen')
  }

  return (
    <div>
      {modals.isContractModalOpen && (
        <ContractModal
          onApply={onContractFilterApply}
          onReset={onContractFilterReset}
          addContract={addContract}
          deleteContract={deleteContract}
          selectedContract={selectedContract}
        />
      )}
      <button
        onClick={() => {
          toggleModal('isContractModalOpen')
        }}
        className={`${selectedContractFilter === undefined ? 'text-gray5 border-gray2' : 'text-main-500 border-gray2'} hover:border-gray3 flex h-[36px] cursor-pointer items-center gap-x-2 rounded-[12px] border px-4 whitespace-nowrap transition hover:duration-75`}
      >
        <p className="kr-button">
          {selectedContractFilter === undefined
            ? t('recruitHome.filters.contractType')
            : t(convertEnumToKorContractTypeLabel(selectedContractFilter))}
        </p>
        {modals.isContractModalOpen ? (
          <DropDownGray3Icon width={20} height={20} />
        ) : (
          <DropDownGray4Icon width={20} height={20} />
        )}
      </button>
    </div>
  )
}
