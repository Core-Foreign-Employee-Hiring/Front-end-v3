'use client'

import { Button, Label, Spacing } from '@/components/common'
import { Main5000PlusIcon } from '@/assets/svgComponents'
import { BottomButton } from '@/components/spec/index'
import { useSpecCertification } from '@/hooks'
import { SpecCertificationType } from '@/types/spec'
import { useSpecStore } from '@/store/specStore'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { postSpecCertifications } from '@/lib/client/spec/certification'
import EditCertificationEntry from '@/components/spec/certification/EditCertificationEntry'
import CertificationEntry from '@/components/spec/certification/CertificationEntry'
import { uploadFile } from '@/lib/client/common'
import { useTranslation } from 'react-i18next'

interface SpecCertificationProps {
  certificationsData: SpecCertificationType[] | null | undefined
}

export default function SpecCertification({ certificationsData }: SpecCertificationProps) {
  const { t } = useTranslation(['spec'])
  const { handleNext, handlePrev, certifications, isActive } = useSpecCertification()

  const { editCertifications, setEditCertifications, setCertifications, addCertification } = useSpecStore(
    (state) => state
  )

  const router = useRouter()

  useEffect(() => {
    // 기존에 저장된 값이 있다면 editData에 추가
    if (certificationsData) {
      setEditCertifications(certificationsData)
    }
  }, [certificationsData])

  const handleSave = async () => {
    try {
      const updatedCertifications = await Promise.all(
        certifications.map(async (cert) => {
          const newCert = { ...cert }

          // 1. 실제로 '파일'이 들어있는 경우에만 업로드 실행
          if (newCert.documentUrl instanceof File) {
            const uploadUrl = await uploadFile(newCert.documentUrl)
            newCert.documentUrl = uploadUrl || null // 업로드 실패 시 null 혹은 빈 문자열
          }
          // 2. 만약 documentUrl이 File도 아니고, 문자열도 아닌 (빈 객체 {} 등) 경우
          else if (typeof newCert.documentUrl !== 'string') {
            newCert.documentUrl = null // API가 받을 수 있는 깨끗한 상태로 변경
          }

          return newCert
        })
      )

      // 전송 전 최종 데이터 확인 (디버깅용)
      console.log('정제된 데이터:', updatedCertifications)

      const result = await postSpecCertifications(updatedCertifications)

      // 3. 성공 후 처리
      if (result.success) {
        setCertifications([]) // 추가용 임시 상태 초기화 (필요시)
        router.refresh()
        alert('모든 자격증이 성공적으로 저장되었습니다.')
      }
    } catch (error) {
      console.error('저장 과정 중 오류 발생:', error)
      alert('저장 중 오류가 발생했습니다. 다시 시도해주세요.')
    }
  }

  return (
    <div>
      <Label
        label={t('certification.title')}
        type={'titleMd'}
        rightElement={
          <Button
            onClick={() => {
              addCertification({ documentUrl: null, certificationName: '', acquiredDate: '' })
            }}
            variant={'secondary'}
            size={'md'}
            customClassName={'w-fit'}
            leftIcon={<Main5000PlusIcon width={20} height={20} />}
          >
            {t('buttons.add')}
          </Button>
        }
      />

      <Spacing height={16} />

      <div className="flex flex-col gap-y-[16px]">
        {editCertifications.map((editCertification) => (
          <EditCertificationEntry
            key={editCertification.certificationId}
            editCertification={editCertification}
            initialFormOpenState={false}
            certificationsData={certificationsData}
          />
        ))}
      </div>

      <div className="flex flex-col gap-y-[16px]">
        {certifications.map((certification, index) => (
          <CertificationEntry key={index} index={index} certification={certification} initialFormOpenState={true} />
        ))}
      </div>

      <Spacing height={100} />

      <Button onClick={handleSave}>{t('buttons.save')}</Button>
      <Spacing height={100} />

      <BottomButton handlePrev={handlePrev} isNextButtonActive={true} handleNext={handleNext} />
    </div>
  )
}
