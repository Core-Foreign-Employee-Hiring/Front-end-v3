'use client'

import { useModifyProfileStore } from '@/store/modifyProfileStore'
import { Button, Label, TextInput } from '@/components/common'
import { useModalStore } from '@/store/modalStore'
import SearchAddressModal from '@/components/common/modal/SearchAddressModal'

export default function AddressField() {
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
        <Label label={'주소'} isRequired={true} type={'titleSm'} />
        {/* 우편 번호 입력 */}
        <div className="flex gap-x-2">
          <TextInput
            onClick={() => {
              toggleModal('isSearchAddressModalOpen')
            }}
            value={modifyProfileData.zipcode || ''}
            onChange={() => {}}
            placeholder={'우편번호'}
          />
          <Button
            onClick={() => {
              toggleModal('isSearchAddressModalOpen')
            }}
            size={'lg'}
            variant={'primary'}
            customClassName={'w-[140px]'}
          >
            우편번호 검색
          </Button>
        </div>

        {/* 주소 입력 */}
        <TextInput
          onClick={() => {
            toggleModal('isSearchAddressModalOpen')
          }}
          value={modifyProfileData.address1 || ''}
          onChange={() => {}}
          placeholder={'주소'}
        />

        {/* 상세 주소 입력 */}
        <TextInput
          value={modifyProfileData.address2 || ''}
          onChange={(e) => {
            updateProfile('address2', e.target.value)
          }}
          placeholder={'상세주소를 입력해주세요.'}
        />
      </div>
    </div>
  )
}
