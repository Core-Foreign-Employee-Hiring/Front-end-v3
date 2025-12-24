import { ReactNode } from 'react'

interface PageLayoutProps {
  children?: ReactNode
}
export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="desktop:p-[40px] tablet:px-[32px] flex w-full flex-col items-center justify-center px-[20px] pt-[20px]">
      {children}
    </div>
  )
}
