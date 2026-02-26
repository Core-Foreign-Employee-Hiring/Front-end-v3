'use client'

import { SpecCareerType } from '@/types/spec'
import { useRouter } from 'next/navigation'
import { useSpecStore } from '@/store/specStore'
import { Button, Label, Spacing } from '@/components/common'
import EditCareerCompanyName from '@/components/spec/carrer/EditCareerCompanyName'
import EditCareerPosition from '@/components/spec/carrer/EditCareerPosition'
import EditCareerDuration from '@/components/spec/carrer/EditCareerDuration'
import EditCareerContractType from '@/components/spec/carrer/EditCareerContractType'
import EditCareerHighlight from '@/components/spec/carrer/EditCareerHighlight'
import { putSpecCareers } from '@/lib/client/spec/career'
import { useTranslation } from 'react-i18next'
import { useToast } from '@/components/common/toast/ToastContext'

interface EditCareerFormProps {
  toggleFormOpenState: () => void
  editCareer: SpecCareerType
  careersData: SpecCareerType[] | null | undefined
}
export default function EditCareerForm({ toggleFormOpenState, editCareer, careersData }: EditCareerFormProps) {
  const { t } = useTranslation(['spec', 'message'])
  const { success, error } = useToast()

  const router = useRouter()
  const { updateEditCareer, setEditCareers } = useSpecStore((state) => state)

  /**
   * 특정 인덱스의 전공명 수정 핸들러
   */
  const handleCareerChange = (
    fieldName: 'companyName' | 'position' | 'endDate' | 'startDate' | 'highlight' | 'contractType',
    value: string | null
  ) => {
    // 업데이트 함수 호출 시 변경된 필드만 덮어씌웁니다.
    if (editCareer.careerId) {
      updateEditCareer(editCareer.careerId, {
        companyName: editCareer.companyName,
        startDate: editCareer.startDate,
        endDate: editCareer.endDate,
        contractType: editCareer.contractType,
        position: editCareer.position,
        highlight: editCareer.highlight,
        [fieldName]: value, // 현재 바뀐 값으로 덮어쓰기
      })
    }
  }

  const handleSave = async () => {
    try {
      const result = await putSpecCareers(`${editCareer.careerId}`, editCareer)
      if (result.data) {
        if (result.data.success) {
          router.refresh()
          success(t('message:put_spec_careers.success.title'), t('message:put_spec_careers.success.description'))
        } else {
          error(t('message:put_spec_careers.error.title'), t('message:put_spec_careers.error.description'))
        }
      }
    } catch (e) {
      error(t('message:fetch_error.title'), t('message:fetch_error.description'))
    }
  }

  return (
    <div className="border-gray2 rounded-[12px] border p-5">
      <Spacing height={16} />

      <Label
        label={t('spec:career.form.title')}
        type={'subtitleLg'}
        rightElement={
          <Button
            onClick={() => {
              toggleFormOpenState()
              if (careersData) {
                setEditCareers(careersData)
              }
            }}
            customClassName={'w-fit'}
            variant={'outline'}
            size={'md'}
          >
            {t('spec:buttons.cancel')}
          </Button>
        }
      />

      <Spacing height={16} />
      <EditCareerCompanyName companyName={editCareer.companyName} handleCareerChange={handleCareerChange} />

      <Spacing height={16} />
      <EditCareerPosition position={editCareer.position} handleCareerChange={handleCareerChange} />

      <Spacing height={16} />
      <EditCareerDuration
        startDate={editCareer.startDate}
        endDate={editCareer.endDate}
        handleCareerChange={handleCareerChange}
      />

      <Spacing height={16} />
      <EditCareerContractType contractType={editCareer.contractType} handleCareerChange={handleCareerChange} />

      <Spacing height={16} />
      <EditCareerHighlight highlight={editCareer.highlight} handleCareerChange={handleCareerChange} />

      <Spacing height={16} />
      <div className="flex w-full justify-end">
        <Button onClick={handleSave} size={'md'} customClassName={'w-[160px]'}>
          {t('spec:buttons.edit')}
        </Button>
      </div>
    </div>
  )
}
