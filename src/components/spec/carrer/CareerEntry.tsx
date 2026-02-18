import { useState } from 'react'
import { AddCareerForm } from '@/components/spec'
import { SpecCareerType } from '@/types/spec'
import CareerItem from '@/components/spec/carrer/CareerItem'

interface CareerEntryProps {
  index: number
  career: SpecCareerType
  initialFormOpenState: boolean
}
export default function CareerEntry({ index, initialFormOpenState, career }: CareerEntryProps) {
  const [isFormOpen, setIsFormOpen] = useState(initialFormOpenState)

  const toggleFormOpenState = () => {
    setIsFormOpen(!isFormOpen)
  }

  return isFormOpen ? (
    <AddCareerForm index={index} toggleFormOpenState={toggleFormOpenState} career={career} />
  ) : (
    <CareerItem toggleFormOpenState={toggleFormOpenState} career={career} />
  )
}
