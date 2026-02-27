'use client'

import { useMemo } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useSpecStore } from '@/store/specStore'
import { StepType } from '@/app/[lang]/carrer/page'
import { useToast } from '@/components/common/toast/ToastContext'
import { SpecEducationType } from '@/types/spec'
import { useTranslation } from 'react-i18next'

export default function useSpecEducation(educationData: SpecEducationType | undefined | null) {
  const router = useRouter()
  const pathname = usePathname()
  const { error } = useToast()
  const { t } = useTranslation('message')

  // 1. 스토어에서 데이터와 원본 데이터를 가져옵니다.
  // educationData는 서버에서 받아온 초기 원본 값이라고 가정합니다.
  const education = useSpecStore((state) => state.education)
  const setEducation = useSpecStore((state) => state.setEducation)

  const handleStepClick = (step: StepType) => {
    router.push(`${pathname}?tab=spec&step=${encodeURIComponent(step)}`)
  }

  // 데이터 변경 여부를 확인하는 유틸 함수
  const isChanged = useMemo(() => {
    // 1. 데이터가 아예 없는 경우 (신규 작성 중인 경우)
    if (!educationData) {
      const { schoolName, admissionDate, graduationDate, majors, earnedScore, maxScore } = education || {
        schoolName: '',
        admissionDate: '',
        graduationDate: '',
        majors: [''],
        earnedScore: '',
        maxScore: '',
      }
      // 하나라도 입력된 값이 있는지 확인
      return (
        schoolName !== '' ||
        admissionDate !== '' ||
        graduationDate !== '' ||
        (majors.length > 0 && majors[0] !== '') ||
        earnedScore !== '' ||
        maxScore !== ''
      )
    }

    // 2. 원본 데이터(educationData)가 있는 경우 비교
    // 객체나 배열을 단순 비교하기 위해 JSON.stringify를 활용하거나 필드별로 비교합니다.
    return JSON.stringify(education) !== JSON.stringify(educationData)
  }, [education, educationData])

  const handleNextStep = () => {
    // 변경사항이 있는데 저장을 안 한 경우
    if (isChanged) {
      error(t('message:save_error.title'), t('message:save_error.description')) // 토스트 에러 발생
      return // 함수 종료 (다음 단계로 안 넘어감)
    }

    // 변경사항이 없으면 다음 단계로 이동
    handleStepClick('2')
  }

  // ... (isActive 로직은 그대로 유지)
  const isActive = useMemo(() => {
    if (!education) return false
    const { admissionDate, graduationDate, earnedScore, maxScore, schoolName, majors } = education
    const isAdmissionInvalid = !admissionDate || admissionDate.length <= 4
    const isGraduationInvalid = graduationDate && graduationDate.length <= 4
    const isRangeInvalid =
      Number(earnedScore) < 0 || Number(earnedScore) > 4.5 || Number(maxScore) < 0 || Number(maxScore) > 4.5
    const isScoreInvalid = Number(earnedScore) > Number(maxScore)
    const isSchoolEmpty = !schoolName || schoolName.trim() === ''
    const isMajorEmpty = !majors || majors.length === 0 || (majors.length === 1 && majors[0] === '')
    const isScoreEmpty = [earnedScore, maxScore].some((val) => val === null || val === '' || val === undefined)

    return !(
      isAdmissionInvalid ||
      isGraduationInvalid ||
      isRangeInvalid ||
      isScoreInvalid ||
      isSchoolEmpty ||
      isMajorEmpty ||
      isScoreEmpty
    )
  }, [education])

  return {
    education,
    isActive,
    isChanged, // 필요시 UI에서 저장 버튼 활성화 용도로 사용
    handleAddEducation: () =>
      setEducation({
        schoolName: '',
        admissionDate: '',
        graduationDate: '',
        majors: [''],
        earnedScore: '',
        maxScore: '',
      }),
    handleNextStep, // 업데이트된 함수 반환
  }
}
