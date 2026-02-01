'use client'

import PostCode, { Address } from 'react-daum-postcode' // Address 타입 임포트
import { Button, Modal } from '@/components/common'
import { useModalStore } from '@/store/modalStore'

interface SearchAddressModalProps {
  handleChangeAddress: (zipcode: string, address1: string) => void
}

export default function SearchAddressModal({ handleChangeAddress }: SearchAddressModalProps) {
  const { isSearchAddressModalOpen, setIsSearchAddressModalOpen } = useModalStore()

  const onClose = () => {
    setIsSearchAddressModalOpen(isSearchAddressModalOpen)
  }

  const handleComplete = (data: Address) => {
    let fullAddress = data.address
    let extraAddress = ''

    // addressType: 'R'(도로명), 'J'(지번)
    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : ''
    }

    // zonecode는 우편번호입니다.
    handleChangeAddress(data.zonecode, fullAddress)
    onClose()
  }

  return (
    <Modal
      isOpen={isSearchAddressModalOpen}
      onClose={onClose}
      customClassName={'desktop:w-[860px] tablet:w-[680px] w-[335px]'}
    >
      <Modal.Body>
        <PostCode onComplete={handleComplete} style={{ height: '450px' }} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose} size={'lg'} variant={'outline'}>
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
