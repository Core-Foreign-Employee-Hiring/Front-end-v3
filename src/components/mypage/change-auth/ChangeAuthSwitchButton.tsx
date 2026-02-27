'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'

interface ChangeAuthSwitchButtonProps {
  type: 'id' | 'pw'
}
export default function ChangeAuthSwitchButton({ type }: ChangeAuthSwitchButtonProps) {
  const { t } = useTranslation('my')
  const router = useRouter()
  const pathname = usePathname()
  const contentList: { content: string; type: 'id' | 'pw' }[] = [
    { content: t('change_auth.switch_buttons.id'), type: 'id' },
    { content: t('change_auth.switch_buttons.pw'), type: 'pw' },
  ]
  const handleStepClick = (type: 'id' | 'pw') => {
    router.push(`${pathname}?type=${encodeURIComponent(type)}&step=1`)
  }

  return (
    <div className="bg-gray1 flex w-fit gap-x-2 rounded-[10px] p-1">
      {contentList.map((content) => (
        <button
          onClick={() => handleStepClick(content.type)}
          key={content.type}
          className={`${type == content.type ? 'bg-main-500 kr-badge-md text-white' : 'kr-button text-gray5 bg-transparent'} desktop:w-[120px] tablet:w-[120px] flex w-[100px] cursor-pointer items-center justify-center rounded-[8px] py-3`}
        >
          {content.content}
        </button>
      ))}
    </div>
  )
}
