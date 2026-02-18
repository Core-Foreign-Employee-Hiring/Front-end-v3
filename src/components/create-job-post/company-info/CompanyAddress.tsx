'use client'

import { Button, Label, TextInput } from '@/components/common'
import { useCreateJobPostStore } from '@/store/createJobPostStore'
import { useModalStore } from '@/store/modalStore'
import SearchAddressModal from '@/components/common/modal/SearchAddressModal'

export default function CompanyAddress() {
  const { createJobPost, updateCreateJobPost } = useCreateJobPostStore((state) => state)
  const { modals, toggleModal } = useModalStore((state) => state)

  const handleChangeAddress = (zipcode: string, address1: string, latitude?: number, longitude?: number) => {
    console.log(latitude, longitude)
    updateCreateJobPost('companyZipcode', zipcode)
    updateCreateJobPost('companyAddress1', address1)
    updateCreateJobPost('companyLatitude', latitude)
    updateCreateJobPost('companyLongitude', longitude)
  }

  return (
    <div>
      {modals.isSearchAddressModalOpen && <SearchAddressModal handleChangeAddress={handleChangeAddress} />}
      <div className="flex flex-col gap-y-2">
        <Label label={'회사 주소'} isRequired={true} type={'titleSm'} />
        {/* 우편 번호 입력 */}
        <div className="flex gap-x-2">
          <TextInput
            onClick={() => {
              toggleModal('isSearchAddressModalOpen')
            }}
            value={createJobPost.companyZipcode || ''}
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
          value={createJobPost.companyAddress1 || ''}
          onChange={() => {}}
          placeholder={'주소'}
        />

        {/* 상세 주소 입력 */}
        <TextInput
          value={createJobPost.companyAddress2 || ''}
          onChange={(e) => {
            updateCreateJobPost('companyAddress2', e.target.value)
          }}
          placeholder={'상세주소를 입력해주세요.'}
        />
      </div>
    </div>
  )
}
