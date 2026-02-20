'use client'

import { SpecAwardType } from '@/types/spec'
import { useState } from 'react'
import EditAwardForm from '@/components/spec/award/EditAwardForm'
import AwardItem from '@/components/spec/award/AwardItem'

interface EditAwardEntryProps {
  awardsData: SpecAwardType[] | null | undefined
  initialFormOpenState: boolean
  editAward: SpecAwardType
}

export default function EditAwardEntry({ awardsData, editAward, initialFormOpenState }: EditAwardEntryProps) {
  const [isFormOpen, setIsFormOpen] = useState(initialFormOpenState)

  const toggleFormOpenState = () => {
    setIsFormOpen(!isFormOpen)
  }

  return isFormOpen ? (
    <EditAwardForm toggleFormOpenState={toggleFormOpenState} editAward={editAward} awardsData={awardsData} />
  ) : (
    <AwardItem toggleFormOpenState={toggleFormOpenState} award={editAward} />
  )
}
