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
import { useToast } from '@/components/common/toast/ToastContext'

interface SpecCertificationProps {
  certificationsData: SpecCertificationType[] | null | undefined
}

export default function SpecCertification({ certificationsData }: SpecCertificationProps) {
  const { t } = useTranslation(['spec', 'message'])
  const { success, error } = useToast()
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
            if (uploadUrl) {
              // 업로드된 URL로 데이터 교체
              newCert.documentUrl = uploadUrl
            } else {
              newCert.documentUrl = null
              // 업로드 실패 시 로직 처리 (예: return 또는 에러 던지기)
              error(t('message:file_upload_error.title'), t('message:file_upload_error.description'))
              return
            }
          }
          // 2. 만약 documentUrl이 File도 아니고, 문자열도 아닌 (빈 객체 {} 등) 경우
          else if (typeof newCert.documentUrl !== 'string') {
            newCert.documentUrl = null // API가 받을 수 있는 깨끗한 상태로 변경
          }

          return newCert
        })
      )

      const result = await postSpecCertifications(updatedCertifications as SpecCertificationType[])

      // 3. 성공 후 처리
      if (result.data) {
        if (result.success) {
          setCertifications([]) // 추가용 임시 상태 초기화 (필요시)
          router.refresh()
          success(
            t('message:post_spec_certifications.success.title'),
            t('message:post_spec_certifications.success.description')
          )
        } else {
          setCertifications([])
          router.refresh()
          error(
            t('message:post_spec_certifications.error.title'),
            t('message:post_spec_certifications.error.description')
          )
        }
      }
    } catch (e) {
      error(t('message:fetch_error.title'), t('message:fetch_error.description'))
    }
  }

  return (
    <div>
      <Label
        label={t('spec:certification.title')}
        type={'titleMd'}
        rightElement={
          <div className="flex gap-x-2">
            <Button size={'md'} customClassName={'w-[72px]'} onClick={handleSave}>
              {t('spec:buttons.save')}
            </Button>
            <Button
              onClick={() => {
                addCertification({ documentUrl: null, certificationName: '', acquiredDate: '' })
              }}
              variant={'secondary'}
              size={'md'}
              customClassName={'w-fit'}
              leftIcon={<Main5000PlusIcon width={20} height={20} />}
            >
              {t('spec:buttons.add')}
            </Button>
          </div>
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
      <BottomButton handlePrev={handlePrev} isNextButtonActive={true} handleNext={handleNext} />
    </div>
  )
}
