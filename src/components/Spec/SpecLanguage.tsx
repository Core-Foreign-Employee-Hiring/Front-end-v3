'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Button, Label, Spacing } from '@/components/common'
import { Main5000PlusIcon } from '@/assets/svgComponents'
import { AddLangForm, BottomButton } from '@/components/spec/index'
import { StepType } from '@/app/[lang]/spec/page'
import { useSpecStore } from '@/store/specStore'
import { useMemo } from 'react'

export default function SpecLanguage() {
  const router = useRouter()
  const pathname = usePathname()

  const languageSkills = useSpecStore((state) => state.spec.languageSkills)
  const addLanguageSkills = useSpecStore((state) => state.addLanguageSkills)

  const handleStepClick = (step: StepType) => {
    router.push(`${pathname}?step=${encodeURIComponent(step)}`)
  }

  /**
   * 전공 입력창 추가 핸들러
   */
  const handleAddLanguageSkills = () => {
    addLanguageSkills({ title: '', score: '' })
  }

  const isActive = useMemo(() => {
    // 1. languageSkills가 null이거나 빈 배열([])이면 다음 단계 진행 가능 (true)
    if (!languageSkills || languageSkills.length === 0) return true

    // 2. 항목이 하나라도 추가되었다면, 모든 항목의 title과 score가 채워졌는지 확인
    return languageSkills.every((lang) => {
      const isTitleFilled = lang.title.trim() !== ''
      const isScoreFilled = lang.score.trim() !== ''

      // 둘 다 빈 문자열이 아니어야 해당 항목은 유효함
      return isTitleFilled && isScoreFilled
    })
  }, [languageSkills])

  return (
    <div>
      <Label
        label={'어학 능력'}
        type={'titleMd'}
        rightElement={
          <Button
            onClick={handleAddLanguageSkills}
            variant={'secondary'}
            size={'md'}
            customClassName={'w-fit'}
            leftIcon={<Main5000PlusIcon width={20} height={20} />}
          >
            추가
          </Button>
        }
      />

      {languageSkills?.map((languageSkill, index) => (
        <AddLangForm key={index} index={index} title={languageSkill.title} score={languageSkill.score} />
      ))}

      <Spacing height={80} />
      <BottomButton
        handlePrev={() => handleStepClick('1')}
        isNextButtonActive={isActive}
        handleNext={() => handleStepClick('3')}
      />
    </div>
  )
}
