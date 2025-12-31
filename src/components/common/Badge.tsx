import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface BadgeProps {
  children: ReactNode
  bgColor: string // bg-[] 형태여야함
  textColor: string // text-[] 형태여야함
}
export default function Badge({ children, bgColor, textColor }: BadgeProps) {
  return (
    <div
      className={twMerge(
        'kr-badge-sm text-main-500 bg-main-100 flex h-[20px] w-fit items-center justify-center rounded-[4px] px-2',
        bgColor,
        textColor
      )}
    >
      {children}
    </div>
  )
}
