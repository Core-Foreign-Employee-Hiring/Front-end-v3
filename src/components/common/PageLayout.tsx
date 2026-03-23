import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface PageLayoutProps {
  children?: ReactNode
  className?: string
}

export default function PageLayout({ children, className }: PageLayoutProps) {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div
        className={twMerge(
          // w-full로 기본 너비를 채우고, max-w-[1280px]로 상한선을 둡니다.
          'tablet:px-[32px] tablet:py-[32px] desktop:p-[40px] flex w-full max-w-[1280px] flex-col px-[20px] py-[20px]',
          className
        )}
      >
        {children}
      </div>
    </div>
  )
}
