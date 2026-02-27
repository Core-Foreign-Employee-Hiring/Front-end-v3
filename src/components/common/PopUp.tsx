import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface PopUpProps {
  children: ReactNode
  className?: string
}

export default function PopUp({ children, className }: PopUpProps) {
  return (
    <div
      className={`${twMerge('border-gray2 absolute top-10 right-0 z-10 flex w-[160px] flex-col rounded-[8px] border bg-white', className)}`}
    >
      {children}
    </div>
  )
}

PopUp.PopUpItem = function PopUpItem({
  onClick,
  children,
  textColor,
}: {
  onClick: () => void
  children: ReactNode
  textColor?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${twMerge('kr-button hover:bg-gray1 h-[40px] items-center justify-center', textColor)}`}
    >
      {children}
    </button>
  )
}
