'use client'

import { CheckIcon, UncheckIcon } from '@/assets/svgComponents'
import { useRememberMe } from '@/hooks'

export default function SaveIdButton() {
  const { isRemembered, handleToggle } = useRememberMe()

  return (
    <div className="flex cursor-pointer items-center gap-x-2 select-none" onClick={handleToggle}>
      {isRemembered ? <CheckIcon width={20} height={20} /> : <UncheckIcon width={20} height={20} />}
      <p className="kr-subtitle-md text-gray5">아이디 저장</p>
    </div>
  )
}
