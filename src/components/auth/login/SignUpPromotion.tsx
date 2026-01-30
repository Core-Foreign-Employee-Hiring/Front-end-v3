import { ReactNode } from 'react'

interface SignUpPromotionProps {
  children: ReactNode
}
export default function SignUpPromotion({ children }: SignUpPromotionProps) {
  return <div className="flex flex-col items-center justify-center gap-y-1">{children}</div>
}
