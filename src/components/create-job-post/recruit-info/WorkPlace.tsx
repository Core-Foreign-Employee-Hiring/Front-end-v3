'use client'

import { useModalStore } from '@/store/modalStore'
import SearchAddressModal from '@/components/common/modal/SearchAddressModal'
import { Button, Label, TextInput } from '@/components/common'
import { useCreateJobPostStore } from '@/store/createJobPostStore'

export default function WorkPlace() {
  const { createJobPost, updateCreateJobPost } = useCreateJobPostStore((state) => state)
  const { toggleModal, modals } = useModalStore((state) => state)

  const handleChangeAddress = (zipcode: string, address1: string, latitude?: number, longitude?: number) => {
    console.log(latitude, longitude)
    updateCreateJobPost('workZipcode', zipcode)
    updateCreateJobPost('workAddress1', address1)
    updateCreateJobPost('workLatitude', latitude)
    updateCreateJobPost('workLongitude', longitude)
  }

  return (
    <div>
      {modals.isSearchAddressModalOpen && <SearchAddressModal handleChangeAddress={handleChangeAddress} />}
      <div className="flex flex-col gap-y-2">
        <Label label={'근무 주소'} isRequired={true} type={'titleSm'} />
        {/* 우편 번호 입력 */}
        <div className="flex gap-x-2">
          <TextInput
            onClick={() => {
              toggleModal('isSearchAddressModalOpen')
            }}
            value={createJobPost.workZipcode || ''}
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
          value={createJobPost.workAddress1 || ''}
          onChange={() => {}}
          placeholder={'주소'}
        />

        {/* 상세 주소 입력 */}
        <TextInput
          value={createJobPost.workAddress2 || ''}
          onChange={(e) => {
            updateCreateJobPost('workAddress2', e.target.value)
          }}
          placeholder={'상세주소를 입력해주세요.'}
        />
      </div>
    </div>
  )
}
