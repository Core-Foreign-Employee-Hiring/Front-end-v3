'use client'

import { useModalStore } from '@/store/modalStore'
import React from 'react'
import { usePathname } from 'next/navigation'
import MoreOptionsMenu from '@/components/common/MoreOptionsMenu'
import GlobalModals from '@/components/common/modal/GlobalModals'

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const { setModal, modals } = useModalStore((state) => state)

  const pathname = usePathname()
  const locale = pathname.split('/')[1]

  return (
    <main className="">
      <GlobalModals currentLng={locale} />
      {modals.isMoreOptionsMenuOpen ? <MoreOptionsMenu lang={locale} path={pathname} /> : children}
    </main>
  )
}
