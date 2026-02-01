import { ReactNode } from 'react'

interface ErrorMessageProps {
  children: ReactNode
}
export default function ErrorMessage({ children }: ErrorMessageProps) {
  return <p className="kr-subtitle-sm text-error">{children}</p>
}
