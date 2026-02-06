'use client'

import { useRef } from 'react'
import { ModifyProfileType } from '@/types/auth/modify-profile'
import { useModifyProfileStore } from '@/store/modifyProfileStore'

export default function ProfileStoreInitializer({
  initialData,
}: {
  initialData: Partial<ModifyProfileType> | undefined
}) {
  const initialized = useRef(false)

  if (!initialized.current) {
    // 스토어의 상태를 직접 업데이트 (최초 1회만 실행)
    useModifyProfileStore.setState({ modifyProfileData: initialData })
    initialized.current = true
  }

  return null
}
