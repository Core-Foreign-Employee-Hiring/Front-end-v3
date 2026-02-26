import { BottomBorder, Label, Spacing } from '@/components/common'
import { PromotionDescription, SignUpCTAButton, SignUpPromotion } from '@/components/auth/login'
import { LogoIcon } from '@/assets/svgComponents'
import LoginFormContainer from '@/components/auth/login/LoginFormContainer'
import { getTranslationServer } from '@/lib/i18n'
import { Locale } from '@/lib/i18n.types'

interface LoginProps {
  params: Promise<{ lang: Locale }>
}
export default async function LoginPage({ params }: LoginProps) {
  const { lang } = await params
  const { t } = await getTranslationServer(lang, 'login')

  return (
    <main className="desktop:justify-center desktop:items-center flex min-h-screen w-full flex-col">
      <div className="desktop:px-0 desktop:py-0 desktop:w-[508px] tablet:px-[32px] tablet:py-[40px] flex w-full flex-col items-center justify-center px-[20px] py-[32px]">
        <div className="desktop:flex hidden flex-col items-center gap-y-[80px]">
          <LogoIcon width={193} height={60} />
          <Label type={'titleLg'} label={t('title')} className={'mb-[40px]'} />
        </div>

        <LoginFormContainer lang={lang} />

        <Spacing height={32} />
        <BottomBorder color={'gray2'} />
        <Spacing height={32} />

        <SignUpPromotion>
          <PromotionDescription description={t('buttons.cta')} />
          <SignUpCTAButton href={`/${lang}/sign-up?step=1`} />
        </SignUpPromotion>
      </div>
    </main>
  )
}
