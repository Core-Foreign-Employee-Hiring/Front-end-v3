'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

interface TabProps {
  tabList: { content: string; path: string; key: string }[]
}

export default function Tab({ tabList }: TabProps) {
  const searchParams = useSearchParams()
  const currentTab = searchParams.get('tab') || 'home'

  return (
    <div className="border-gray2 flex w-fit gap-x-2 border-b">
      {tabList.map((tab) => (
        <Link
          href={tab.path}
          key={tab.content}
          type={'button'}
          className={`${tab.key === currentTab ? 'border-main-500 text-main-500 kr-badge-md border-b-[2px]' : 'kr-button text-gray5 border-transparent'} flex w-[120px] items-center justify-center border-b-[2px] p-3`}
        >
          {tab.content}
        </Link>
      ))}
    </div>
  )
}
