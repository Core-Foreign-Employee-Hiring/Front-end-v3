import { ReactNode } from 'react'

interface ErrorHelperTextProps {
  children: ReactNode
}
export default function ErrorHelperText({ children }: ErrorHelperTextProps) {
  return <p className="kr-badge-md text-error">{children}</p>
}
