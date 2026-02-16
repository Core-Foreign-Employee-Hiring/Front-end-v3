'use client'

import { Button, Label, Spacing } from '@/components/common'
import { Main5000PlusIcon } from '@/assets/svgComponents'
import { SpecLanguageSkillType } from '@/types/spec'
import { useSpecStore } from '@/store/specStore'
import { useEffect } from 'react'
import LanguageEntry from '@/components/spec/language/LanguageEntry'
import { useSpecLanguage } from '@/hooks'
import BottomButton from '@/components/spec/BottomButton'
import EditLanguageEntry from '@/components/spec/language/EditLanguageEntry'

interface SpecLanguageProps {
  languageSkillsData: SpecLanguageSkillType[] | null | undefined
}

export default function SpecLanguage({ languageSkillsData }: SpecLanguageProps) {
  const { languageSkills, addLanguageSkill, setEditLanguageSkills, editLanguageSkills } = useSpecStore((state) => state)
  const { handlePrev, handleNext, isActive } = useSpecLanguage()

  useEffect(() => {
    // 기존에 저장된 값이 있다면 editData에 추가
    if (languageSkillsData) {
      setEditLanguageSkills(languageSkillsData)
    }
  }, [languageSkillsData])

  return (
    <div>
      <Label
        label={'어학 능력'}
        type={'titleMd'}
        rightElement={
          <Button
            onClick={() => {
              addLanguageSkill({ title: '', score: '' })
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

      <div className="flex flex-col gap-y-[16px]">
        {editLanguageSkills.map((languageSkill) => {
          return (
            <EditLanguageEntry
              key={languageSkill.languageSkillId}
              languageSkill={languageSkill}
              initialFormOpenState={false}
              languageSkillsData={languageSkillsData}
            />
          )
        })}
      </div>

      <Spacing height={16} />

      <div className="flex flex-col gap-y-[16px]">
        {languageSkills.map((languageSkill, index) => {
          return <LanguageEntry key={index} index={index} initialFormOpenState={true} languageSkill={languageSkill} />
        })}
      </div>

      <Spacing height={100} />
      <BottomButton handlePrev={handlePrev} isNextButtonActive={isActive} handleNext={handleNext} />
    </div>
  )
}
