import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface PageLayoutProps {
  children?: ReactNode
  className?: string
}
export default function PageLayout({ children, className }: PageLayoutProps) {
  return (
    <div
      className={twMerge(
        'desktop:p-[40px] tablet:px-[32px] tablet:py-[40px] flex w-full flex-col px-[20px] py-[32px]',
        className
      )}
    >
      {children}
    </div>
  )
}
