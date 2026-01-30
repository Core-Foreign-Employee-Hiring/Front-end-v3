import Link from 'next/link'
import { ReactNode } from 'react'

interface AccountRecoveryLinksProps {
  children: ReactNode
}

export default function FindAccountLinks({ children }: AccountRecoveryLinksProps): ReactNode {
  return <div className="kr-button text-gray5 flex items-center gap-x-2">{children}</div>
}

function FindIdLink({ findIdHref }: { findIdHref: string }) {
  return (
    <Link href={findIdHref}>
      아이디 찾기 <span className="pl-1">|</span>
    </Link>
  )
}

function FindPwLink({ findPwHref }: { findPwHref: string }) {
  return <Link href={findPwHref}>비밀번호 찾기</Link>
}

FindAccountLinks.FindIdLink = FindIdLink
FindAccountLinks.FindPwLink = FindPwLink
