import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface BadgeProps {
  leftIcon?: ReactNode
  children: ReactNode
  bgColor?: string // bg-[] 형태여야함
  textColor?: string // text-[] 형태여야함
  customClassName?: string
}
export default function Badge({ children, bgColor, textColor, customClassName, leftIcon }: BadgeProps) {
  return (
    <div
      className={twMerge(
        'kr-badge-sm text-main-500 bg-main-100 flex h-[20px] w-fit items-center justify-center gap-x-1 rounded-[4px] px-2',
        bgColor,
        textColor,
        customClassName
      )}
    >
      {leftIcon && leftIcon}
      {children}
    </div>
  )
}
