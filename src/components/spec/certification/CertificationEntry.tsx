'use client'

import { SpecCertificationType } from '@/types/spec'
import { useState } from 'react'
import CertificationItem from '@/components/spec/certification/CertificationItem'
import { AddCertForm } from '@/components/spec'

interface CertificationEntryProps {
  index: number
  certification: SpecCertificationType
  initialFormOpenState: boolean
}
export default function CertificationEntry({ index, certification, initialFormOpenState }: CertificationEntryProps) {
  const [isFormOpen, setIsFormOpen] = useState(initialFormOpenState)

  const toggleFormOpenState = () => {
    setIsFormOpen(!isFormOpen)
  }

  return isFormOpen ? (
    <AddCertForm index={index} toggleFormOpenState={toggleFormOpenState} certification={certification} />
  ) : (
    <CertificationItem toggleFormOpenState={toggleFormOpenState} certification={certification} />
  )
}
