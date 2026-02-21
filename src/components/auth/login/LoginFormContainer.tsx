'use client'

import { useLoginAction } from '@/hooks'
import { AccountRecoveryLinks, Id, LoginButton, LoginOptions, Password, SaveIdButton } from '@/components/auth/login'
import { Spacing } from '@/components/common'

export default function LoginFormContainer({ lang }: { lang: string }) {
  const { loginProcess } = useLoginAction(lang)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    loginProcess()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e)
    }
  }

  return (
    <form onKeyDown={handleKeyDown} onSubmit={handleSubmit} className="flex w-full flex-col">
      <div className="flex w-full flex-col gap-y-5">
        <Id />
        <Password />
        <LoginOptions>
          <SaveIdButton />
          <AccountRecoveryLinks
            findIdHref={`/${lang}/find-auth?type=id&step=1`}
            findPwHref={`/${lang}/find-auth?type=pw&step=1`}
          />
        </LoginOptions>
      </div>
      <Spacing height={24} />
      <LoginButton lang={lang} /> {/* 이제 이 안의 button type="submit"이 위의 handleSubmit을 실행시킵니다 */}
    </form>
  )
}
