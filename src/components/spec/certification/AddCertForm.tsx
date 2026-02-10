'use client'

import { useEffect } from 'react'
import { CertAcquiredDate, CertDocumentURL, CertName } from '@/components/spec'
import { Button, Label, Spacing } from '@/components/common'
import { DeleteIcon } from '@/assets/svgComponents'
import { useSpecStore } from '@/store/specStore'

interface AddCertFormProps {
  index: number
  certificationName: string
  acquiredDate: string
  documentUrl: string | null | File
}
export default function AddCertForm({ index, certificationName, documentUrl, acquiredDate }: AddCertFormProps) {
  const certifications = useSpecStore((state) => state.spec.certifications)
  const removeCertification = useSpecStore((state) => state.removeCertification)
  const updateCertification = useSpecStore((state) => state.updateCertification)

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
      certificationName, // 기존 props 값
      acquiredDate, // 기존 props 값
      documentUrl, // 기존 props 값
      [fieldName]: value, // 현재 바뀐 값으로 덮어쓰기
    })
  }

  useEffect(() => {
    console.log('certifications', certifications)
  }, [certifications])

  return (
    <>
      <Spacing height={16} />

      <Label
        label={'자격 내용'}
        type={'subtitleLg'}
        rightElement={
          <Button
            onClick={() => removeCertification(index)}
            leftIcon={<DeleteIcon width={20} height={20} />}
            customClassName={'w-fit'}
            variant={'outline'}
            size={'md'}
          >
            삭제
          </Button>
        }
      />

      <Spacing height={24} />
      <CertName
        index={index}
        certificationName={certificationName}
        handleCertificationChange={handleCertificationChange}
      />

      <Spacing height={24} />
      <CertAcquiredDate
        index={index}
        acquiredDate={acquiredDate}
        handleCertificationChange={handleCertificationChange}
      />

      <Spacing height={24} />
      <CertDocumentURL index={index} documentURL={documentUrl} handleCertificationChange={handleCertificationChange} />

      <Spacing height={32} className="border-gray3 border-b" />
    </>
  )
}
