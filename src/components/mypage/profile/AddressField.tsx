'use client'

import { useModifyProfileStore } from '@/store/modifyProfileStore'
import { Button, Label, TextInput } from '@/components/common'
import { useModalStore } from '@/store/modalStore'
import SearchAddressModal from '@/components/common/modal/SearchAddressModal'
import { useTranslation } from 'react-i18next'

export default function AddressField() {
  const { t } = useTranslation('my')
  const { modifyProfileData, updateProfile } = useModifyProfileStore((state) => state)
  const { toggleModal, modals } = useModalStore((state) => state)

  const handleChangeAddress = (zipcode: string, address1: string) => {
    updateProfile('zipcode', zipcode)
    updateProfile('address1', address1)
  }

  return (
    <div>
      {modals.isSearchAddressModalOpen && <SearchAddressModal handleChangeAddress={handleChangeAddress} />}
      <div className="flex flex-col gap-y-2">
        <Label label={t('profile.address_field.label')} isRequired={true} type={'titleSm'} />
        {/* 우편 번호 입력 */}
        <div className="flex gap-x-2">
          <TextInput
            onClick={() => {
              toggleModal('isSearchAddressModalOpen')
            }}
            value={modifyProfileData.zipcode || ''}
            onChange={() => {}}
            placeholder={t('address_field.zipcode_placeholder')}
          />
          <Button
            onClick={() => {
              toggleModal('isSearchAddressModalOpen')
            }}
            size={'lg'}
            variant={'primary'}
            customClassName={'w-[140px]'}
          >
            {t('profile.address_field.buttons.search_zipcode')}
          </Button>
        </div>

        {/* 주소 입력 */}
        <TextInput
          onClick={() => {
            toggleModal('isSearchAddressModalOpen')
          }}
          value={modifyProfileData.address1 || ''}
          onChange={() => {}}
          placeholder={t('profile.address_field.label')}
        />

        {/* 상세 주소 입력 */}
        <TextInput
          value={modifyProfileData.address2 || ''}
          onChange={(e) => {
            updateProfile('address2', e.target.value)
          }}
          placeholder={t('profile.address_field.detail_address_placeholder')}
        />
      </div>
    </div>
  )
}
