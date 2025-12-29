import { BottomBorder, Label, Spacing } from '@/components/common'
import {
  AccountRecoveryLinks,
  Id,
  LoginButton,
  LoginOptions,
  Password,
  PromotionDescription,
  SaveIdButton,
  SignUpCTAButton,
  SignUpPromotion,
} from '@/components/login'

interface LoginProps {
  params: Promise<{ lang: string }>
}
export default async function LoginPage({ params }: LoginProps) {
  const { lang } = await params

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex w-[508px] flex-col items-center justify-center">
        <Label type={'titleLg'} label="로그인" />

        <Spacing height={40} />
        <Id />

        <Spacing height={32} />
        <Password />

        <Spacing height={20} />
        <LoginOptions>
          <SaveIdButton />
          <AccountRecoveryLinks>
            <AccountRecoveryLinks.FindIdLink findIdHref={'/login/find?type=id&step=1'} />
            <AccountRecoveryLinks.FindPwLink findPwHref={'/login/find?type=pw&step=1'} />
          </AccountRecoveryLinks>
        </LoginOptions>

        <Spacing height={24} />
        <LoginButton lang={lang} />

        <Spacing height={32} />
        <BottomBorder color={'gray2'} />

        <Spacing height={32} />
        <SignUpPromotion>
          <PromotionDescription description={'Korfit 회원이 되어 더 많은 서비스를 즐겨보세요!'} />
          <SignUpCTAButton href={`/${lang}/sign-up`} />
        </SignUpPromotion>
      </div>
    </main>
  )
}
