'use client'

import RequiredLoginModal from '@/components/common/modal/RequiredLoginModal'
import React from 'react'
import { useModalStore } from '@/store/modalStore'

interface GlobalModalsProps {
  currentLng: string
}
export default function GlobalModals({ currentLng }: GlobalModalsProps) {
  const modals = useModalStore((state) => state.modals)
  return <>{modals.isRequiredLoginModalOpen && <RequiredLoginModal lang={currentLng} />}</>
}
