'use client'

import { usePathname, useRouter } from 'next/navigation'

interface ChangeAuthSwitchButtonProps {
  type: 'id' | 'pw'
}
export default function ChangeAuthSwitchButton({ type }: ChangeAuthSwitchButtonProps) {
  const router = useRouter()
  const pathname = usePathname()
  const contentList: { content: string; type: 'id' | 'pw' }[] = [
    { content: '아이디 변경', type: 'id' },
    { content: '비밀번호 변경', type: 'pw' },
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
          className={`${type == content.type ? 'bg-main-500 kr-badge-md text-white' : 'kr-button text-gray5 bg-transparent'} flex w-[120px] cursor-pointer items-center justify-center rounded-[8px] py-3`}
        >
          {content.content}
        </button>
      ))}
    </div>
  )
}
