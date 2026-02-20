'use client'

import { SpecCareerType } from '@/types/spec'
import { useState } from 'react'
import EditCareerForm from '@/components/spec/carrer/EditCareerForm'
import CareerItem from '@/components/spec/carrer/CareerItem'

interface EditCareerEntryProps {
  editCareer: SpecCareerType
  initialFormOpenState: boolean
  careersData: SpecCareerType[] | null | undefined
}
export default function EditCareerEntry({ editCareer, initialFormOpenState, careersData }: EditCareerEntryProps) {
  const [isFormOpen, setIsFormOpen] = useState(initialFormOpenState)

  const toggleFormOpenState = () => {
    setIsFormOpen(!isFormOpen)
  }

  return isFormOpen ? (
    <EditCareerForm toggleFormOpenState={toggleFormOpenState} editCareer={editCareer} careersData={careersData} />
  ) : (
    <CareerItem toggleFormOpenState={toggleFormOpenState} career={editCareer} />
  )
}
