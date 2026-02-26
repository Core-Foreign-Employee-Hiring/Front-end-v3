'use client'

import { Button, Label, Modal } from '@/components/common'
import { useModalStore } from '@/store/modalStore'
import InfoPicker from '@/components/resume/info-picker/InfoPicker'
import { patchResume } from '@/lib/client/resume'
import { useResumeStore } from '@/store/resumeStore'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'

export default function InfoPickerModal() {
  const { t } = useTranslation('modal')
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
            <Label label={t('info_picker.header.title')} type={'titleMd'} />
          </div>

          <div className="desktop:flex-row tablet:flex-row flex flex-col">
            <Label label={t('info_picker.header.sub_title')} type={'titleMd'} />
          </div>
        </div>
      </Modal.Header>
      <Modal.Body>
        <InfoPicker />
      </Modal.Body>
      <Modal.Footer>
        <>
          <Button onClick={onClose} variant={'outline'} size={'lg'} customClassName={'w-[200px]'}>
            {t('footer_buttons.close')}
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
            {t('info_picker.footer.export')}
          </Button>
        </>
      </Modal.Footer>
    </Modal>
  )
}
