'use client'
import { Button, Modal } from '@/components/common'
import { ApplicationMethodType } from '@/types/job-post'
import { useModalStore } from '@/store/modalStore'

interface ApplicationMethodModalProps {
  applicationMethod: ApplicationMethodType
  directInputApplicationMethod: string
}

export default function ApplicationMethodModal({
  applicationMethod,
  directInputApplicationMethod,
}: ApplicationMethodModalProps) {
  const { isApplicationMethodModalOpen, setIsApplicationMethodModalOpen } = useModalStore((state) => state)
  const convertHeaderTitle = (applicationMethod: ApplicationMethodType) => {
    switch (applicationMethod) {
      case 'EMAIL':
        return '이메일 지원'
      case 'WEBSITE':
        return '웹사이트 지원'
      case 'PHONE_SMS':
        return '전화 / 문자 지원'
    }
  }

  const onClose = () => {
    setIsApplicationMethodModalOpen(isApplicationMethodModalOpen)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(directInputApplicationMethod)
      alert('복사되었습니다!') // 또는 Toast UI 사용 추천
    } catch (error) {
      console.error('복사 실패:', error)
      alert('복사에 실패했습니다. 직접 복사해 주세요.')
    }
  }

  return (
    <Modal isOpen={isApplicationMethodModalOpen} mobileHidden={false} onClose={onClose}>
      <Modal.Header>
        <div className="flex w-full items-center justify-center">
          <h1 className="kr-subtitle-lg">
            해당 공고는 <span className="text-main-500">`{convertHeaderTitle(applicationMethod)}`</span> 입니다.
          </h1>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="flex w-full items-center justify-center">
          <p className="kr-body-md text-gray5">{directInputApplicationMethod}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <>
          <Button onClick={onClose} variant={'outline'}>
            닫기
          </Button>
          <Button onClick={handleCopy}>링크 복사</Button>
        </>
      </Modal.Footer>
    </Modal>
  )
}
