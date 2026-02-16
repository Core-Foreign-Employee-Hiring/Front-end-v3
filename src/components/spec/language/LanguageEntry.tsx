'use client'

import { useState } from 'react'
import { AddLangForm } from '@/components/spec'
import LanguageItem from '@/components/spec/language/LanguageItem'
import { SpecLanguageSkillType } from '@/types/spec'

interface LanguageEntryProps {
  initialFormOpenState: boolean // 수정이면 form false, 새로 만드는거면 form true
  languageSkill: SpecLanguageSkillType
  index?: number
}

export default function LanguageEntry({ initialFormOpenState, languageSkill, index }: LanguageEntryProps) {
  const [isFormOpen, setIsFormOpen] = useState(initialFormOpenState)
  const toggleState = () => {
    setIsFormOpen(!isFormOpen)
  }

  return isFormOpen ? (
    <AddLangForm index={index} languageSkill={languageSkill} toggleState={toggleState} />
  ) : (
    <LanguageItem languageSkill={languageSkill} toggleState={toggleState} />
  )
}
