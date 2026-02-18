'use client'

import { SpecExperienceType } from '@/types/spec'
import { useState } from 'react'
import { AddExperienceForm } from '@/components/spec'
import ExperienceItem from '@/components/spec/experience/ExperienceItem'

interface ExperienceEntryProps {
  experience: SpecExperienceType
  index: number
  initialFormOpenState: boolean
}
export default function ExperienceEntry({ experience, index, initialFormOpenState }: ExperienceEntryProps) {
  const [isFormOpen, setIsFormOpen] = useState(initialFormOpenState)

  const toggleFormOpenState = () => {
    setIsFormOpen(!isFormOpen)
  }

  return isFormOpen ? (
    <AddExperienceForm index={index} toggleFormOpenState={toggleFormOpenState} experience={experience} />
  ) : (
    <ExperienceItem toggleFormOpenState={toggleFormOpenState} experience={experience} />
  )
}
