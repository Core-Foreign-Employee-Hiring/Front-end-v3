'use client'

import { Button, Label, Spacing } from '@/components/common'
import { Main5000PlusIcon } from '@/assets/svgComponents'
import { AddLangForm, BottomButton } from '@/components/spec/index'
import { useSpecLanguage } from '@/hooks'

export default function SpecLanguage() {
  const { languageSkills, handleAddLanguageSkills, handlePrev, handleNext, isActive } = useSpecLanguage()

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

      <Spacing height={100} />
      <BottomButton handlePrev={handlePrev} isNextButtonActive={isActive} handleNext={handleNext} />
    </div>
  )
}
