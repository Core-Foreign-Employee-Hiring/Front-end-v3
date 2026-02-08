'use client'

import { Button, Label, Modal } from '@/components/common'
import { CONTRACT_LIST } from '@/utils/filterList'
import { ContractEnumType } from '@/types/spec'
import { useModalStore } from '@/store/modalStore'
import { useTranslation } from 'react-i18next'
import { CarrerType } from '@/types/job-post'

interface ContractModalProps {
  addContract: (contract: ContractEnumType | CarrerType) => void
  deleteContract: (contract: ContractEnumType | CarrerType) => void
  selectedContract: ContractEnumType | CarrerType | undefined
  onApply: () => void
  onReset: () => void
}

export default function ContractModal({ addContract, selectedContract, onReset, onApply }: ContractModalProps) {
  const { isContractModalOpen, setIsContractModalOpen } = useModalStore((state) => state)
  const { t } = useTranslation()
  const onClose = () => {
    setIsContractModalOpen(isContractModalOpen)
  }
  return (
    <Modal customClassName={'desktop:w-[860px] tablet:w-[680px]'} isOpen={isContractModalOpen} onClose={onClose}>
      <Modal.Header
        rightElement={
          <Button onClick={onReset} size={'sm'} customClassName={'w-[70px]'} variant={'outline'}>
            초기화
          </Button>
        }
      >
        <Label label={'계약 형태 선택'} type={'titleMd'} />
      </Modal.Header>

      <Modal.Body>
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
