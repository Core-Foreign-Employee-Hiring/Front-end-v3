'use client'

import { Button, Label, TextInput } from '@/components/common'
import { useRegisterStore } from '@/store/registerStore'
import { useModalStore } from '@/store/modalStore'
import SearchAddressModal from '@/components/common/modal/SearchAddressModal'
import { useTranslation } from 'react-i18next'

export default function AddressField() {
  const { t } = useTranslation('signup')
  const { registerData, updateRegister } = useRegisterStore((state) => state)
  const { toggleModal, modals } = useModalStore((state) => state)

  const handleChangeAddress = (zipcode: string, address1: string) => {
    updateRegister('zipcode', zipcode)
    updateRegister('address1', address1)
  }

  return (
    <div>
      {modals.isSearchAddressModalOpen && <SearchAddressModal handleChangeAddress={handleChangeAddress} />}
      <div className="flex flex-col gap-y-2">
        <Label label={t('step1.addressField.label')} isRequired={true} type={'titleSm'} />
        {/* 우편 번호 입력 */}
        <div className="flex gap-x-2">
          <TextInput
            onClick={() => {
              toggleModal('isSearchAddressModalOpen')
            }}
            value={registerData.zipcode || ''}
            onChange={() => {}}
            placeholder={t('step1.addressField.placeholder.zipcode')}
          />
          <Button
            onClick={() => {
              toggleModal('isSearchAddressModalOpen')
            }}
            size={'lg'}
            variant={'primary'}
            customClassName={'w-[140px]'}
          >
            {t('step1.addressField.button.search')}
          </Button>
        </div>

        {/* 주소 입력 */}
        <TextInput
          onClick={() => {
            toggleModal('isSearchAddressModalOpen')
          }}
          value={registerData.address1 || ''}
          onChange={() => {}}
          placeholder={t('step1.addressField.label')}
        />

        {/* 상세 주소 입력 */}
        <TextInput
          value={registerData.address2 || ''}
          onChange={(e) => {
            updateRegister('address2', e.target.value)
          }}
          placeholder={t('step1.addressField.placeholder.address2')}
        />
      </div>
    </div>
  )
}
