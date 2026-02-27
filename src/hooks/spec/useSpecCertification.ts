'use client'

import { useMemo } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useSpecStore } from '@/store/specStore'
import { StepType } from '@/app/[lang]/carrer/page'
import { SpecCertificationType } from '@/types/spec'
import { useToast } from '@/components/common/toast/ToastContext'
import { useTranslation } from 'react-i18next'

export default function useSpecCertification(certificationsData: SpecCertificationType[] | null | undefined) {
  const router = useRouter()
  const pathname = usePathname()
  const { error } = useToast()
  const { t } = useTranslation('message')

  const { certifications, editCertifications, addCertification } = useSpecStore((state) => state)

  const navigateToStep = (step: StepType) => {
    router.push(`${pathname}?tab=spec&step=${encodeURIComponent(step)}`)
  }

  // 변경 사항 감지 로직
  const isChanged = useMemo(() => {
    // 1. 현재 화면의 모든 데이터를 합침 (신규 + 수정)
    const currentTotal = [...editCertifications, ...certifications]
      .map((cert) => ({
        certificationName: cert.certificationName.trim(),
        acquiredDate: cert.acquiredDate.trim(),
        // 파일 객체인 경우 이름만 비교하거나, 존재 여부만 체크 (비교 가능하게 변환)
        hasFile: !!cert.documentUrl,
        fileName: cert.documentUrl instanceof File ? cert.documentUrl.name : cert.documentUrl,
      }))
      .filter((cert) => cert.certificationName !== '' || cert.acquiredDate !== '')

    // 2. 서버 원본 데이터 가공
    const original = (certificationsData || []).map((cert) => ({
      certificationName: cert.certificationName.trim(),
      acquiredDate: cert.acquiredDate.trim(),
      hasFile: !!cert.documentUrl,
      fileName: cert.documentUrl,
    }))

    if (currentTotal.length !== original.length) return true

    return JSON.stringify(currentTotal) !== JSON.stringify(original)
  }, [certifications, editCertifications, certificationsData])

  const isActive = useMemo(() => {
    if (!certifications || certifications.length === 0) return true
    return certifications.every((cert) => {
      return cert.certificationName.trim() !== '' && cert.acquiredDate.trim().length >= 5
    })
  }, [certifications])

  const handleNext = () => {
    if (isChanged) {
      error(t('message:save_error.title'), t('message:save_error.description'))
      return
    }
    navigateToStep('4')
  }

  return {
    certifications,
    isActive,
    isChanged,
    handlePrev: () => navigateToStep('2'),
    handleNext,
  }
}
