'use client'
import { Button, Label, Modal } from '@/components/common'
import { useModalStore } from '@/store/modalStore'
import { useRouter } from 'next/navigation'

interface NotUseResumeServiceModalProps {
  lang: string
}

export default function NotUseResumeServiceModal({ lang }: NotUseResumeServiceModalProps) {
  const { isNotUseResumeService, setIsNotUseResumeService } = useModalStore((state) => state)
  const router = useRouter()

  return (
    <Modal isOpen={isNotUseResumeService}>
      <Modal.Header>
        <Label label={'스펙 분석을 먼저 해야 이력서를 추출할 수 있습니다.'} />
      </Modal.Header>
      <Modal.Footer>
        <>
          <Button
            onClick={() => {
              router.back()
              setIsNotUseResumeService(isNotUseResumeService)
            }}
            variant={'outline'}
          >
            닫기
          </Button>
          <Button
            onClick={() => {
              router.push(`/${lang}/carrer?tab=spec`)
            }}
            variant={'primary'}
          >
            스펙 분석
          </Button>
        </>
      </Modal.Footer>
    </Modal>
  )
}
