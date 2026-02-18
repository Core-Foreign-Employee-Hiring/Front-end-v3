'use client'

import { SpecExperienceType } from '@/types/spec'
import { useState } from 'react'
import EditExperienceForm from '@/components/spec/experience/EditExperienceForm'
import ExperienceItem from '@/components/spec/experience/ExperienceItem'

interface EditExperienceEntryProps {
  experiencesData: SpecExperienceType[] | null | undefined
  initialFormOpenState: boolean
  editExperience: SpecExperienceType
}
export default function EditExperienceEntry({
  experiencesData,
  editExperience,
  initialFormOpenState,
}: EditExperienceEntryProps) {
  const [isFormOpen, setIsFormOpen] = useState(initialFormOpenState)

  const toggleFormOpenState = () => {
    setIsFormOpen(!isFormOpen)
  }

  return isFormOpen ? (
    <EditExperienceForm
      toggleFormOpenState={toggleFormOpenState}
      editExperience={editExperience}
      experiencesData={experiencesData}
    />
  ) : (
    <ExperienceItem toggleFormOpenState={toggleFormOpenState} experience={editExperience} />
  )
}
