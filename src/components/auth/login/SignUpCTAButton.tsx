import Link from 'next/link'

export default function SignUpCTAButton({ href }: { href: string }) {
  return (
    <Link href={href} className="kr-button text-main-500 decoration-main-500 underline decoration-1 underline-offset-4">
      회원가입
    </Link>
  )
}
