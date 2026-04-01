'use client'

import { Button, Label, Modal, TextInput } from '@/components/common'
import { useModalStore } from '@/store/modalStore'
import { useOrderStore } from '@/store/orderStore'
import { useToast } from '@/components/common/toast/ToastContext'
import { postCashReceipt } from '@/lib/client/order'

export default function CashReceiptModal() {
  const { success, error } = useToast()
  const { modals, toggleModal } = useModalStore()
  const { cashReceipt, updateCashReceipt, merchantOrderId } = useOrderStore()

  const closeModal = () => toggleModal('isCashReceiptModalOpen')

  const handleSave = async () => {
    // 1. 데이터가 유효한지 먼저 체크 (Type Guard)
    const { type, customerIdentityNumber } = cashReceipt

    if (!type || !customerIdentityNumber) {
      error('입력 오류', '모든 항목을 입력해주세요.')
      return
    }

    // 2. 이제 확실히 데이터가 있으므로 객체를 새로 구성해서 전달
    // 이렇게 하면 TypeScript가 자동으로 타입을 추론합니다.
    const result = await postCashReceipt(merchantOrderId, {
      type,
      customerIdentityNumber,
    })

    if (result.success) {
      success('설정 완료', '현금영수증 정보가 저장되었습니다.')
      // 스토어 초기화 로직 (이미 만드신 resetCashReceipt가 있다면 그걸 쓰셔도 좋습니다)
      updateCashReceipt('type', '')
      updateCashReceipt('customerIdentityNumber', '')
      closeModal()
    } else {
      error('설정 실패', '현금영수증 정보가 저장되지 않았어요.')
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
        <Label label="현금영수증 신청" type={'subtitleLg'} />
      </Modal.Header>

      <Modal.Body>
        <div className="flex flex-col gap-y-6">
          {/* 1. 발행 종류 선택 (탭 스타일) */}
          <div className="flex flex-col gap-y-2">
            <Label label="발행 종류" isRequired={true} type={'titleSm'} labelColor={'text-gray5'} />
            <div className="flex gap-x-2">
              {(['소득공제', '지출증빙'] as const).map((t) => (
                <Button
                  key={t}
                  size="md"
                  variant={cashReceipt.type === t ? 'primary' : 'outline'}
                  customClassName="flex-1"
                  onClick={() => {
                    updateCashReceipt('type', t)
                    updateCashReceipt('customerIdentityNumber', '')
                  }}
                >
                  {t}
                </Button>
              ))}
            </div>
          </div>

          {/* 2. 번호 입력 */}
          <div className="flex flex-col gap-y-2">
            <Label
              isRequired={true}
              label={cashReceipt.type === '소득공제' ? '휴대폰 번호 또는 카드번호' : '사업자 등록번호'}
              type={'titleSm'}
              labelColor={'text-gray5'}
            />
            <TextInput
              placeholder={cashReceipt.type === '소득공제' ? "'-' 없이 입력" : '사업자 번호 10자리 입력'}
              value={cashReceipt.customerIdentityNumber ?? ''}
              onChange={(e) => {
                updateCashReceipt('customerIdentityNumber', e.target.value)
              }}
              maxLength={30}
            />
            <p className="text-gray4 text-xs">
              {cashReceipt.type === '소득공제'
                ? '소비자 인증수단으로 휴대폰 번호 등을 입력하세요.'
                : '지출증빙을 위해 사업자등록번호를 입력하세요.'}
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
            신청 안함
          </Button>
          <Button
            state={cashReceipt.type !== '' && cashReceipt.customerIdentityNumber !== '' ? 'default' : 'disable'}
            onClick={handleSave}
            variant={'primary'}
            customClassName="flex-1"
          >
            적용하기
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}
