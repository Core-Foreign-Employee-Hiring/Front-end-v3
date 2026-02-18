'use client'

import { Button, Label, Modal } from '@/components/common'
import { useModalStore } from '@/store/modalStore'
import InfoPicker from '@/components/resume/info-picker/InfoPicker'
import { patchResume } from '@/lib/client/resume'
import { useResumeStore } from '@/store/resumeStore'
import { useRouter } from 'next/navigation'

export default function InfoPickerModal() {
  const router = useRouter()

  const { createResumeResponse, resumeSelection, selectedType } = useResumeStore((state) => state)
  const onNavigate = (resumeId: number) => {
    router.push(`/carrer/resume/${resumeId}/${selectedType}`)
  }
  const { modals, toggleModal } = useModalStore((state) => state)
  const onClose = () => {
    toggleModal('isInfoPickerModalOpen')
  }

  return (
    <Modal
      mobileHidden={false}
      customClassName={'desktop:w-[860px] tablet:w-[680px] w-[335px]'}
      onClose={onClose}
      isOpen={modals.isInfoPickerModalOpen}
    >
      <Modal.Header>
        <div className="flex flex-col gap-y-2">
          <div className="desktop:flex-row tablet:flex-row flex flex-col">
            <Label label={'지원 목적에 맞게 '} type={'titleMd'} />
            <Label label={'이력서에 포함할 정보를 선택하세요.'} type={'titleMd'} />
          </div>

          <div className="desktop:flex-row tablet:flex-row flex flex-col">
            <Label label={'나의 강점이 가장 잘 드러나는'} type={'subtitleMd'} labelColor={'text-gray5'} />
            <Label label={'맞춤형 PDF 이력서를 만들 수 있어요.'} type={'subtitleMd'} labelColor={'text-gray5'} />
          </div>
        </div>
      </Modal.Header>
      <Modal.Body>
        <InfoPicker />
      </Modal.Body>
      <Modal.Footer>
        <>
          <Button onClick={onClose} variant={'outline'} size={'lg'} customClassName={'w-[200px]'}>
            닫기
          </Button>
          <Button
            onClick={async () => {
              const result = await patchResume(createResumeResponse.resumeId, resumeSelection)
              console.log('result', result)
              onClose()
              onNavigate(createResumeResponse.resumeId)
            }}
            variant={'primary'}
            size={'lg'}
          >
            내보내기
          </Button>
        </>
      </Modal.Footer>
    </Modal>
  )
}
