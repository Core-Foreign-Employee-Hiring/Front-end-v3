'use client'

import { Button, Label, Modal, TextInput } from '@/components/common'
import { useModalStore } from '@/store/modalStore'
import { useOrderStore } from '@/store/orderStore'
import { useToast } from '@/components/common/toast/ToastContext'
import { postCashReceipt } from '@/lib/client/order'
import { useTranslation } from 'react-i18next'

export default function CashReceiptModal() {
  const { success, error } = useToast()
  const { t } = useTranslation(['modal', 'message'])
  const { modals, toggleModal } = useModalStore()
  const { cashReceipt, updateCashReceipt, merchantOrderId } = useOrderStore()

  const closeModal = () => toggleModal('isCashReceiptModalOpen')

  const handleSave = async () => {
    // 1. 데이터가 유효한지 먼저 체크 (Type Guard)
    const { type, customerIdentityNumber } = cashReceipt

    if (!type || !customerIdentityNumber) {
      error(t('message:post_cash_receipt.input_error.title'), t('message:post_cash_receipt.input_error.description'))
      return
    }

    // 2. 이제 확실히 데이터가 있으므로 객체를 새로 구성해서 전달
    // 이렇게 하면 TypeScript가 자동으로 타입을 추론합니다.
    const result = await postCashReceipt(merchantOrderId, {
      type,
      customerIdentityNumber,
    })

    if (result.success) {
      success(t('message:post_cash_receipt.success.title', 'message:post_cash_receipt.success.description'))
      // 스토어 초기화 로직 (이미 만드신 resetCashReceipt가 있다면 그걸 쓰셔도 좋습니다)
      updateCashReceipt('type', '')
      updateCashReceipt('customerIdentityNumber', '')
      closeModal()
    } else {
      error(t('message:post_cash_receipt.error.title', 'message:post_cash_receipt.error.description'))
    }
  }

  return (
    <Modal
      mobileHidden={false}
      customClassName={'w-[400px]'} // 현금영수증은 좀 더 콤팩트하게
      onClose={closeModal}
      isOpen={modals.isCashReceiptModalOpen}
    >
      <Modal.Header>
        <Label label={t('modal:cash_receipt.title')} type={'subtitleLg'} />
      </Modal.Header>

      <Modal.Body>
        <div className="flex flex-col gap-y-6">
          {/* 1. 발행 종류 선택 (탭 스타일) */}
          <div className="flex flex-col gap-y-2">
            <Label
              label={t('modal:cash_receipt.type.label')}
              isRequired={true}
              type={'titleSm'}
              labelColor={'text-gray5'}
            />
            <div className="flex gap-x-2">
              {([t('modal:cash_receipt.type.personal'), t('modal:cash_receipt.type.business')] as const).map(
                (content) => (
                  <Button
                    key={content}
                    size="md"
                    variant={cashReceipt.type === content ? 'primary' : 'outline'}
                    customClassName="flex-1"
                    onClick={() => {
                      updateCashReceipt('type', content)
                      updateCashReceipt('customerIdentityNumber', '')
                    }}
                  >
                    {content}
                  </Button>
                )
              )}
            </div>
          </div>

          {/* 2. 번호 입력 */}
          <div className="flex flex-col gap-y-2">
            <Label
              isRequired={true}
              label={
                cashReceipt.type === t('modal:cash_receipt.type.personal')
                  ? t('modal:cash_receipt.input.personalLabel')
                  : t('modal:cash_receipt.input.businessLabel')
              }
              type={'titleSm'}
              labelColor={'text-gray5'}
            />
            <TextInput
              placeholder={
                cashReceipt.type === t('modal:cash_receipt.type.personal')
                  ? t('modal:cash_receipt.input.personalPlaceholder')
                  : t('modal:cash_receipt.input.businessPlaceholder')
              }
              value={cashReceipt.customerIdentityNumber ?? ''}
              onChange={(e) => {
                updateCashReceipt('customerIdentityNumber', e.target.value)
              }}
              maxLength={30}
            />
            <p className="text-gray4 text-xs">
              {cashReceipt.type === t('modal:cash_receipt.type.personal')
                ? t('modal:cash_receipt.input.personalDescription')
                : t('modal:cash_receipt.input.businessDescription')}
            </p>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <div className="flex w-full gap-x-2">
          <Button
            onClick={() => {
              updateCashReceipt('type', '')
              updateCashReceipt('customerIdentityNumber', '')
              closeModal()
            }}
            variant={'outline'}
            customClassName="flex-1"
          >
            {t('modal:cash_receipt.button.cancel')}
          </Button>
          <Button
            state={cashReceipt.type !== '' && cashReceipt.customerIdentityNumber !== '' ? 'default' : 'disable'}
            onClick={handleSave}
            variant={'primary'}
            customClassName="flex-1"
          >
            {t('modal:cash_receipt.button.apply')}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}
