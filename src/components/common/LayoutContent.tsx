'use client'

import { useModalStore } from '@/store/modalStore'
import React from 'react'
import { usePathname } from 'next/navigation'
import MoreOptionsMenu from '@/components/common/MoreOptionsMenu'
import GlobalModals from '@/components/common/modal/GlobalModals'
import RequiredLoginModal from '@/components/common/modal/RequiredLoginModal'

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const isMoreOptionsMenuOpen = useModalStore((state) => state.isMoreOptionsMenuOpen)
  const { isRequiredLoginModalOpen } = useModalStore((state) => state)

  const pathname = usePathname()
  const locale = pathname.split('/')[1]

  return (
    <main className="">
      {isMoreOptionsMenuOpen ? <MoreOptionsMenu lang={locale} path={pathname} /> : children}
      <RequiredLoginModal lang={locale} />
      <GlobalModals currentLng={locale} />
    </main>
  )
}
