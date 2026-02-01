import { ReactNode } from 'react'

interface SuccessMessageProps {
  children: ReactNode
}
export default function SuccessMessage({ children }: SuccessMessageProps) {
  return <p className="kr-subtitle-sm text-main-500">{children}</p>
}
