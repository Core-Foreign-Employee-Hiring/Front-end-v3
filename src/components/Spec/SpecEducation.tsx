'use client'

import { useMemo } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Main5000PlusIcon } from '@/assets/svgComponents'
import { Button, Label, Spacing } from '../common'
import { AddEduForm, BottomButton } from '@/components/spec/index'
import { StepType } from '@/app/[lang]/spec/page'
import { useSpecStore } from '@/store/specStore'

export default function SpecEducation() {
  const router = useRouter()
  const pathname = usePathname()

  const handleStepClick = (step: StepType) => {
    router.push(`${pathname}?step=${encodeURIComponent(step)}`)
  }

  const education = useSpecStore((state) => state.spec.education)
  const setEducation = useSpecStore((state) => state.setEducation)

  const isActive = useMemo(() => {
    if (!education) return false

    const { admissionDate, graduationDate, earnedScore, maxScore, schoolName, majors } = education

    // 1. 날짜 유효성 체크
    // - admissionDate는 필수이므로 4글자 이하이면 Invalid
    // - graduationDate는 null이 아닐 때만 길이를 체크 (null이면 재학 중이므로 통과)
    const isAdmissionInvalid = !admissionDate || admissionDate.length <= 4
    const isGraduationInvalid = graduationDate.length <= 4 && graduationDate.length <= 4
    const isDateInvalid = isAdmissionInvalid || isGraduationInvalid

    // 2. 점수 범위 체크 (추가된 부분: 0 ~ 4.5 사이여야 함)
    const isRangeInvalid =
      Number(earnedScore) < 0 || Number(earnedScore) > 4.5 || Number(maxScore) < 0 || Number(maxScore) > 4.5

    // 3. 취득 점수가 만점보다 높은 경우
    const isScoreInvalid = Number(earnedScore) > Number(maxScore)

    // 4. 학교명이 빈 값인 경우
    const isSchoolEmpty = !schoolName || schoolName.trim() === ''

    // 5. 전공이 빈 배열이거나 첫 번째 요소가 빈 문자열인 경우
    const isMajorEmpty = !majors || majors.length === 0 || (majors.length === 1 && majors[0] === '')

    // 6. 취득 점수나 만점이 입력되지 않은 경우 (0도 허용한다면 체크 방식 주의)
    const isScoreEmpty =
      earnedScore === null || maxScore === null || earnedScore === undefined || maxScore === undefined

    // 모든 조건이 정상일 때만 true 반환
    if (isDateInvalid || isScoreInvalid || isSchoolEmpty || isMajorEmpty || isScoreEmpty || isRangeInvalid) {
      return false
    }

    return true
  }, [education]) // education과 isOpen이 변경될 때마다 다시 계산합니다.

  return (
    <div>
      <Label
        label={'학력 정보'}
        className="kr-title-md"
        rightElement={
          <Button
            onClick={() => {
              setEducation({
                schoolName: '',
                admissionDate: '',
                graduationDate: '',
                majors: [''],
                earnedScore: 0,
                maxScore: 0,
              })
            }}
            variant={'secondary'}
            size={'md'}
            customClassName={'w-fit'}
            leftIcon={<Main5000PlusIcon width={20} height={20} />}
          >
            추가
          </Button>
        }
      />
      <Spacing height={16} />

      {education && <AddEduForm />}

      <Spacing height={80} />
      <BottomButton isNextButtonActive={isActive} handleNext={() => handleStepClick('2')} />
    </div>
  )
}
