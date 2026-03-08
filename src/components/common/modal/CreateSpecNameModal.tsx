'use client'
import { Button, Label, Modal, TextInput } from '@/components/common'
import { useTranslation } from 'react-i18next'
import { useToast } from '@/components/common/toast/ToastContext'
import { useModalStore } from '@/store/modalStore'
import TextIndicator from '@/components/common/TextIndicator'
import { useSpecStore } from '@/store/specStore'
import { useRouter } from 'next/navigation'
import { postSpecResult } from '@/lib/client/spec'

export default function CreateSpecNameModal() {
  const { t } = useTranslation(['modal', 'message'])
  const router = useRouter()
  const { success, error } = useToast()
  const { modals, toggleModal, setModal } = useModalStore((state) => state)
  const { specName, setSpecName, setSpecEvaluationId } = useSpecStore((state) => state)

  const onClose = () => {
    toggleModal('isCreateSpecNameModalOpen')
    setSpecName('')
  }

  return (
    <Modal mobileHidden={false} onClose={onClose} isOpen={modals.isCreateSpecNameModalOpen}>
      <Modal.Header>
        <Label label={t('modal:create_spec_name.title')} type={'subtitleLg'} />
      </Modal.Header>

      <Modal.Body>
        <div className="flex flex-col gap-y-2">
          <Label label={t('modal:create_spec_name.body.label')} type={'titleSm'} labelColor={'text-gray5'} />
          <TextInput
            maxLength={12}
            rightElement={<TextIndicator currentTextLength={specName.length} maxTextLength={12} />}
            placeholder={t('modal:create_spec_name.body.placeholder')}
            value={specName}
            onChange={(e) => {
              setSpecName(e.target.value)
            }}
          />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <>
          <Button onClick={onClose} variant={'outline'} size={'lg'} buttonType={'button'}>
            {t('modal:footer_buttons.cancel')}
          </Button>
          <Button
            onClick={async () => {
              onClose()
              setModal('isCareerAnalysisLoadingModalOpen', true)

              try {
                const specResult = await postSpecResult(specName)
                if (specResult.success && specResult.data?.data) {
                  success(
                    t('message:post_spec_result.success.title'),
                    t('message:post_spec_result.success.description')
                  )
                  setSpecEvaluationId(specResult.data.data)
                  setModal('isCareerAnalysisLoadingModalOpen', false)
                  setSpecName('')
                  router.push(`/career/${specResult.data.data}`)
                } else {
                  setModal('isCareerAnalysisLoadingModalOpen', false)
                  error(t('message:post_spec_result.error.title'), t('message:post_spec_result.error.description'))
                }
              } catch (e) {
                setModal('isCareerAnalysisLoadingModalOpen', false)
                error(t('message:fetch_error.title'), t('message:fetch_error.description'))
              }
            }}
            variant={'primary'}
            size={'lg'}
            buttonType={'button'}
          >
            {t('modal:footer_buttons.save')}
          </Button>
        </>
      </Modal.Footer>
    </Modal>
  )
}
