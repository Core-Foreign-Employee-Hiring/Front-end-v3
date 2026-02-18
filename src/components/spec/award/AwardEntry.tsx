'use client'

import { SpecAwardType } from '@/types/spec'
import { useState } from 'react'
import { AddAwardForm } from '@/components/spec'
import AwardItem from '@/components/spec/award/AwardItem'

interface AwardEntryProps {
  award: SpecAwardType
  index: number
  initialFormOpenState: boolean
}
export default function AwardEntry({ award, index, initialFormOpenState }: AwardEntryProps) {
  const [isFormOpen, setIsFormOpen] = useState(initialFormOpenState)

  const toggleFormOpenState = () => {
    setIsFormOpen(!isFormOpen)
  }

  return isFormOpen ? (
    <AddAwardForm index={index} toggleFormOpenState={toggleFormOpenState} award={award} />
  ) : (
    <AwardItem toggleFormOpenState={toggleFormOpenState} award={award} />
  )
}
