'use client'

import PostCode, { Address } from 'react-daum-postcode'
import { Button, Modal } from '@/components/common'
import { useModalStore } from '@/store/modalStore'

interface SearchAddressModalProps {
  handleChangeAddress: (zipcode: string, address1: string, latitude?: number, longitude?: number) => void
}

export default function SearchAddressModal({ handleChangeAddress }: SearchAddressModalProps) {
  const { isSearchAddressModalOpen, setIsSearchAddressModalOpen } = useModalStore()

  // 수정: 명시적으로 false를 전달해야 모달이 닫힙니다.
  const onClose = () => {
    setIsSearchAddressModalOpen(isSearchAddressModalOpen)
  }

  const handleComplete = (data: Address) => {
    let fullAddress = data.address
    let extraAddress = ''

    if (data.addressType === 'R') {
      if (data.bname !== '') extraAddress += data.bname
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : ''
    }

    // 카카오 객체가 있는지 먼저 확인
    const kakao = window.kakao

    if (kakao && kakao.maps) {
      // autoload=false 환경에서도 안전하게 실행하기 위해 load 사용
      kakao.maps.load(() => {
        // services 라이브러리가 로드되었는지 확인
        if (kakao.maps.services) {
          const geocoder = new kakao.maps.services.Geocoder()

          geocoder.addressSearch(data.address, (result, status) => {
            if (status === kakao.maps.services.Status.OK && result.length > 0) {
              const latitude = Number(result[0].y)
              const longitude = Number(result[0].x)
              handleChangeAddress(data.zonecode, fullAddress, latitude, longitude)
            } else {
              handleChangeAddress(data.zonecode, fullAddress)
            }
            onClose()
          })
        } else {
          console.error('카카오 지도 services 라이브러리가 로드되지 않았습니다.')
          handleChangeAddress(data.zonecode, fullAddress)
          onClose()
        }
      })
    } else {
      console.error('카카오 SDK가 로드되지 않았습니다.')
      handleChangeAddress(data.zonecode, fullAddress)
      onClose()
    }
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
