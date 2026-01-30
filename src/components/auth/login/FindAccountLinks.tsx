import { ReactNode } from 'react'
import Link from 'next/link'

interface AccountRecoveryLinksProps {
  findIdHref: string
  findPwHref: string
}

export default function FindAccountLinks({ findIdHref, findPwHref }: AccountRecoveryLinksProps): ReactNode {
  return (
    <div className="kr-button text-gray5 flex items-center gap-x-2">
      <Link href={findIdHref}>
        아이디 찾기 <span className="pl-1">|</span>
      </Link>
      <Link href={findPwHref}>비밀번호 찾기</Link>
    </div>
  )
}
