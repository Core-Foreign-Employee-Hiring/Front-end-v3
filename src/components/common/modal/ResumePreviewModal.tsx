import { Button, Label, Modal } from '@/components/common'
import { useModalStore } from '@/store/modalStore'
import Image from 'next/image'

interface ResumePreviewModalProps {
  type: 'ver1' | 'ver2'
}

export default function ResumePreviewModal({ type }: ResumePreviewModalProps) {
  const { toggleModal, modals } = useModalStore((state) => state)
  const onClose = () => {
    toggleModal('isResumePreviewModalOpen')
  }

  return (
    <Modal mobileHidden={false} isOpen={modals.isResumePreviewModalOpen}>
      <Modal.Header>
        <div className="flex flex-col gap-y-2">
          <Label label={'이력서 미리보기'} type={'titleLg'} />
          <p className="text-gray5 kr-subtitle-md">{type === 'ver1' ? 'ver.1' : 'ver.2'}</p>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="relative h-[500px] w-full overflow-y-auto border border-gray-100">
          {/* 2. 실제 이미지의 길이를 확보해줄 안쪽 컨테이너 */}
          <div className="relative w-full" style={{ height: 'fit-content' }}>
            <Image
              alt={'이력서 미리보기'}
              src={type === 'ver1' ? '/resume_ver1.png' : '/resume_ver2.png'}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: 'auto' }} // 너비 고정, 높이 자동 비율
              priority
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="flex w-full justify-start">
          <Button customClassName={'w-[200px]'} onClick={onClose} variant={'outline'}>
            닫기
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}
