'use client'
import { Button, Label } from '@/components/common'
import { CarrerType } from '@/types/job-post'
import { useTranslation } from 'react-i18next'
import { useModalStore } from '@/store/modalStore'
import { CONTRACT_LIST } from '@/utils/filterList'
import { Gray5XIcon } from '@/assets/svgComponents'
import { ContractEnumType } from '@/types/spec'

interface MobileContractModalProps {
  addContract: (contract: ContractEnumType | CarrerType) => void
  deleteContract: (contract: ContractEnumType | CarrerType) => void
  selectedContract: ContractEnumType | CarrerType | undefined
  onApply: () => void
  onReset: () => void
}

export default function MobileContractModal({
  addContract,
  selectedContract,
  onReset,
  onApply,
}: MobileContractModalProps) {
  const { toggleModal, modals } = useModalStore((state) => state)
  const { t } = useTranslation(['filter', 'modal'])
  const onClose = () => {
    toggleModal('isContractModalOpen')
  }

  return (
    <div className="desktop:hidden tablet:hidden fixed inset-0 z-80 flex h-full w-full flex-col gap-y-[24px] overflow-y-auto bg-white p-5">
      <section className="flex items-center justify-between">
        <Label label={t('modal:contract.header.title')} type={'titleMd'} />
        <Gray5XIcon className="cursor-pointer" onClick={onClose} width={24} height={24} />
      </section>
      <div className="flex flex-wrap gap-2">
        {CONTRACT_LIST.map((contract) => (
          <Button
            key={contract.code}
            buttonType={'button'}
            size={'md'}
            onClick={() => addContract(contract.code)}
            customClassName={'w-fit'}
            variant={selectedContract === contract.code ? 'primary' : 'outline'}
          >
            {t(contract.label)}
          </Button>
        ))}
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
