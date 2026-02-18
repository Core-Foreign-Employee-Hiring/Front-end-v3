'use client'

import { SpecCertificationType } from '@/types/spec'
import { useState } from 'react'
import EditCertForm from '@/components/spec/certification/EditCertForm'
import CertificationItem from '@/components/spec/certification/CertificationItem'

interface EditCertificationEntryProps {
  editCertification: SpecCertificationType
  initialFormOpenState: boolean
  certificationsData: SpecCertificationType[] | null | undefined
}
export default function EditCertificationEntry({
  editCertification,
  certificationsData,
  initialFormOpenState,
}: EditCertificationEntryProps) {
  const [isFormOpen, setIsFormOpen] = useState(initialFormOpenState)

  const toggleFormOpenState = () => {
    setIsFormOpen(!isFormOpen)
  }

  return isFormOpen ? (
    <EditCertForm
      toggleFormOpenState={toggleFormOpenState}
      editCertification={editCertification}
      certificationsData={certificationsData}
    />
  ) : (
    <CertificationItem toggleFormOpenState={toggleFormOpenState} certification={editCertification} />
  )
}
