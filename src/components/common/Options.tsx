import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface OptionsProps {
  customClassName?: string
  children: ReactNode
}

export default function Options({ customClassName, children }: OptionsProps) {
  return (
    <div className={twMerge('border-gray2 w-[160px] rounded-[8px] border bg-white shadow-sm', customClassName)}>
      {children}
    </div>
  )
}

Options.Item = function OptionItem({
  onClick,
  children,
  customClassName,
}: {
  children: ReactNode
  customClassName: string
  onClick: () => void
}) {
  return (
    <div
      onClick={onClick}
      className={twMerge(
        'kr-button hover:text-gray5 flex h-[40px] cursor-pointer items-center justify-center',
        customClassName
      )}
    >
      {children}
    </div>
  )
}
