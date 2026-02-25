'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'

interface ChangeContentSwitchButtonProps {
  type: 'sold' | 'purchase' | 'write'
}

export default function ChangeContentSwitchButton({ type }: ChangeContentSwitchButtonProps) {
  const { t } = useTranslation('my')
  const router = useRouter()
  const pathname = usePathname()
  const contentList: { content: string; type: 'sold' | 'purchase' | 'write' }[] = [
    { content: t('content.switch_buttons.sold'), type: 'sold' },
    { content: t('content.switch_buttons.purchase'), type: 'purchase' },
    { content: t('content.switch_buttons.write'), type: 'write' },
  ]
  const handleStepClick = (type: 'sold' | 'purchase' | 'write') => {
    router.push(`${pathname}?type=${encodeURIComponent(type)}&page=0`)
  }
  return (
    <div className="bg-gray1 flex w-fit gap-x-2 rounded-[10px] p-1">
      {contentList.map((content) => (
        <button
          onClick={() => handleStepClick(content.type)}
          key={content.type}
          className={`${type == content.type ? 'bg-main-500 kr-badge-md text-white' : 'kr-button text-gray5 bg-transparent'} flex w-[120px] cursor-pointer items-center justify-center rounded-[8px] py-3`}
        >
          {content.content}
        </button>
      ))}
    </div>
  )
}
