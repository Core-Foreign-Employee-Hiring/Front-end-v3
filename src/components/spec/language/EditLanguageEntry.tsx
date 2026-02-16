'use client'

import { useState } from 'react'
import LanguageItem from '@/components/spec/language/LanguageItem'
import { SpecLanguageSkillType } from '@/types/spec'
import EditLangForm from '@/components/spec/language/EditLangForm'

interface EditLanguageEntryProps {
  initialFormOpenState: boolean // 수정이면 form false, 새로 만드는거면 form true
  languageSkill: SpecLanguageSkillType
  languageSkillsData: SpecLanguageSkillType[] | null | undefined
}

export default function EditLanguageEntry({
  initialFormOpenState,
  languageSkill,
  languageSkillsData,
}: EditLanguageEntryProps) {
  const [isFormOpen, setIsFormOpen] = useState(initialFormOpenState)
  const toggleState = () => {
    setIsFormOpen(!isFormOpen)
  }

  return isFormOpen ? (
    <EditLangForm languageSkill={languageSkill} toggleState={toggleState} languageSkillsData={languageSkillsData} />
  ) : (
    <LanguageItem languageSkill={languageSkill} toggleState={toggleState} />
  )
}
