'use client'

import { Button, Label, Spacing } from '@/components/common'
import { useSpecStore } from '@/store/specStore'
import { SpecCertificationType } from '@/types/spec'
import EditCertName from '@/components/spec/certification/EditCertName'
import EditCertAcquiredDate from '@/components/spec/certification/EditCertAcquiredDate'
import EditCertDocumentURL from '@/components/spec/certification/EditCertDocumentURL'
import { putSpecCertifications } from '@/lib/client/spec/certification'
import { uploadFile } from '@/lib/client/common'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { useToast } from '@/components/common/toast/ToastContext'

interface EditCertFormProps {
  toggleFormOpenState: () => void
  editCertification: SpecCertificationType
  certificationsData: SpecCertificationType[] | null | undefined
}

export default function EditCertForm({
  toggleFormOpenState,
  editCertification,
  certificationsData,
}: EditCertFormProps) {
  const { t } = useTranslation(['spec', 'message'])
  const { success, error } = useToast()
  const router = useRouter()

  const { updateEditCertification, setEditCertifications } = useSpecStore((state) => state)

  /**
   * 특정 인덱스의 전공명 수정 핸들러
   */
  const handleCertificationChange = (
    fieldName: 'certificationName' | 'acquiredDate' | 'documentUrl',
    value: string | File | null
  ) => {
    // 업데이트 함수 호출 시 변경된 필드만 덮어씌웁니다.
    if (editCertification.certificationId) {
      updateEditCertification(editCertification.certificationId, {
        certificationId: editCertification.certificationId,
        certificationName: editCertification.certificationName, // 기존 props 값
        acquiredDate: editCertification.acquiredDate, // 기존 props 값
        documentUrl: editCertification.documentUrl, // 기존 props 값
        [fieldName]: value, // 현재 바뀐 값으로 덮어쓰기
      })
    }
  }

  const handleSave = async () => {
    try {
      // 1. 보낼 데이터를 복사해서 준비 (상태값에 의존하지 않도록)
      const dataToSave = { ...editCertification }

      // 2. 파일 업로드가 필요한 경우 처리
      if (editCertification.documentUrl instanceof File) {
        const uploadUrl = await uploadFile(editCertification.documentUrl)

        if (uploadUrl) {
          // 업로드된 URL로 데이터 교체
          dataToSave.documentUrl = uploadUrl
        } else {
          // 업로드 실패 시 로직 처리 (예: return 또는 에러 던지기)
          error(t('message:file_upload_error.title'), t('message:file_upload_error.description'))
          return
        }
      }

      // 3. 최종 정제된 데이터로 API 요청 (상태 업데이트를 기다릴 필요 없음)
      const result = await putSpecCertifications(`${dataToSave.certificationId}`, dataToSave)

      // 4. API 성공 후 UI 상태 동기화 (선택 사항)
      if (result.data && dataToSave.certificationId) {
        if (result.data.success) {
          updateEditCertification(dataToSave.certificationId, dataToSave)
          router.refresh()
          success(
            t('message:put_spec_certifications.success.title'),
            t('message:put_spec_certifications.success.description')
          )
        } else {
          router.refresh()
          error(
            t('message:put_spec_certifications.error.title'),
            t('message:put_spec_certifications.error.description')
          )
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
        label={t('spec:certification.form.title')}
        type={'subtitleLg'}
        rightElement={
          <Button
            onClick={() => {
              toggleFormOpenState()
              if (certificationsData) {
                setEditCertifications(certificationsData)
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

      <Spacing height={24} />
      <EditCertName
        certificationName={editCertification.certificationName}
        handleCertificationChange={handleCertificationChange}
      />

      <Spacing height={24} />
      <EditCertAcquiredDate
        acquiredDate={editCertification.acquiredDate}
        handleCertificationChange={handleCertificationChange}
      />

      <Spacing height={24} />
      <EditCertDocumentURL
        documentURL={editCertification.documentUrl}
        handleCertificationChange={handleCertificationChange}
      />

      <div className="flex w-full justify-end">
        <Button onClick={handleSave} size={'md'} customClassName={'w-[160px]'}>
          {t('spec:buttons.edit')}
        </Button>
      </div>
    </div>
  )
}
