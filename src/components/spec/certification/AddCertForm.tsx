'use client'

import { CertAcquiredDate, CertDocumentURL, CertName } from '@/components/spec'
import { Button, Label, Spacing } from '@/components/common'
import { useSpecStore } from '@/store/specStore'
import { SpecCertificationType } from '@/types/spec'
import { useTranslation } from 'react-i18next'

interface AddCertFormProps {
  index: number
  toggleFormOpenState: () => void
  certification: SpecCertificationType
}
export default function AddCertForm({ index, certification, toggleFormOpenState }: AddCertFormProps) {
  const { t } = useTranslation(['spec'])
  const { updateCertification, removeCertification } = useSpecStore((state) => state)

  /**
   * 특정 인덱스의 전공명 수정 핸들러
   */
  const handleCertificationChange = (
    index: number,
    fieldName: 'certificationName' | 'acquiredDate' | 'documentUrl',
    value: string | File | null
  ) => {
    // 업데이트 함수 호출 시 변경된 필드만 덮어씌웁니다.
    updateCertification(index, {
      certificationName: certification.certificationName, // 기존 props 값
      acquiredDate: certification.acquiredDate, // 기존 props 값
      documentUrl: certification.documentUrl, // 기존 props 값
      [fieldName]: value, // 현재 바뀐 값으로 덮어쓰기
    })
  }

  return (
    <div className="border-gray2 rounded-[12px] border p-5">
      <Spacing height={16} />

      <Label
        label={t('certification.form.title')}
        type={'subtitleLg'}
        rightElement={
          <Button
            onClick={() => {
              toggleFormOpenState()
              removeCertification(index)
            }}
            customClassName={'w-fit'}
            variant={'outline'}
            size={'md'}
          >
            {t('buttons.cancel')}
          </Button>
        }
      />

      <Spacing height={24} />
      <CertName
        index={index}
        certificationName={certification.certificationName}
        handleCertificationChange={handleCertificationChange}
      />

      <Spacing height={24} />
      <CertAcquiredDate
        index={index}
        acquiredDate={certification.acquiredDate}
        handleCertificationChange={handleCertificationChange}
      />

      <Spacing height={24} />
      <CertDocumentURL
        index={index}
        documentURL={certification.documentUrl}
        handleCertificationChange={handleCertificationChange}
      />
    </div>
  )
}
