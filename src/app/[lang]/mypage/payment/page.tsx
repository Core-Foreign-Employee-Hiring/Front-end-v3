import { Header, Label, PageLayout, Spacing } from '@/components/common'
import { fetchMyPageUserInfo } from '@/lib/server/mypage'
import SideBar from '@/components/mypage/SideBar'
import Footer from '@/components/common/Footer'
import NavBar from '@/components/common/NavBar'
import AuthWatcher from '@/components/auth/AuthWatcher'
import { getTranslationServer } from '@/lib/i18n'
import { Locale } from '@/lib/i18n.types'
import ContentPaymentCards from '@/components/mypage/payment/ContentPaymentCards'

interface MyPageHomeProps {
  params: Promise<{ lang: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function MypagePaymentPage({ params, searchParams }: MyPageHomeProps) {
  const { lang } = await params
  const currentLang = lang as Locale
  const { t } = await getTranslationServer(currentLang, 'my')
  const result = await fetchMyPageUserInfo()

  return (
    <main>
      <AuthWatcher results={[result]} />

      <Header headerType={'default'} currentLng={lang} />
      <PageLayout>
        <Label className={'desktop:block hidden'} label={t('home.title')} type={'titleLg'} />
        <Spacing className={'desktop:block tablet:block hidden'} height={16} />
        <div className="flex shrink-0 gap-x-[32px]">
          <SideBar lang={lang} />
          <ContentPaymentCards />
        </div>
      </PageLayout>
      <Footer />
      <Spacing height={80} className={'desktop:hidden'} />
      <NavBar path={`/${lang}/mypage`} lang={lang} />
    </main>
  )
}
