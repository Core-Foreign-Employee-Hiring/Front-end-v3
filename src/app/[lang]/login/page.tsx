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
} from '@/components/auth/login'
import { LogoIcon } from '@/assets/svgComponents'

interface LoginProps {
  params: Promise<{ lang: string }>
}
export default async function LoginPage({ params }: LoginProps) {
  const { lang } = await params

  return (
    <main className="desktop:justify-center desktop:items-center flex min-h-screen w-full flex-col">
      <div className="desktop:px-0 desktop:py-0 desktop:w-[508px] tablet:px-[32px] tablet:py-[40px] flex w-full flex-col items-center justify-center px-[20px] py-[32px]">
        <div className="desktop:flex hidden flex-col items-center gap-y-[80px]">
          <LogoIcon width={193} height={60} />
          <Label type={'titleLg'} label="로그인" className={'mb-[40px]'} />
        </div>

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
