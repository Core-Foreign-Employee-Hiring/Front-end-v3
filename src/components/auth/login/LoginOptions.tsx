import { ReactNode } from 'react'

interface LoginOptionsProps {
  children: ReactNode
}
export default function LoginOptions({ children }: LoginOptionsProps) {
  return <div className="flex w-full justify-between">{children}</div>
}
