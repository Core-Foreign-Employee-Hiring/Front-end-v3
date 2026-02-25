import UserInfo from '@/components/mypage/home/UserInfo'
import MyPageItem from '@/components/mypage/MyPageItem'
import { Header, Label, PageLayout, Spacing } from '@/components/common'
import { fetchMyPageUserInfo } from '@/lib/server/mypage'
import SideBar from '@/components/mypage/SideBar'
import Footer from '@/components/common/Footer'
import NavBar from '@/components/common/NavBar'
import MobileContentList from '@/components/mypage/home/MobileContentList'
import AuthWatcher from '@/components/auth/AuthWatcher'
import { getTranslationServer } from '@/lib/i18n'
import { Locale } from '@/lib/i18n.types'

interface MyPageHomeProps {
  params: Promise<{ lang: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function HomePage({ params, searchParams }: MyPageHomeProps) {
  const { lang } = await params
  const currentLang = lang as Locale
  const { t } = await getTranslationServer(currentLang, 'my')
  const result = await fetchMyPageUserInfo()
  const userInfo = result.data
  return (
    <main>
      <AuthWatcher results={[result]} />

      <Header headerType={'default'} currentLng={lang} />
      <PageLayout>
        <Label className={'desktop:block hidden'} label={t('home.title')} type={'titleLg'} />
        <Spacing className={'desktop:block tablet:block hidden'} height={16} />
        <div className="flex gap-x-[32px]">
          <SideBar lang={lang} />
          <div className="w-full">
            <Spacing height={16} />
            <UserInfo userInfo={userInfo} />
            <Spacing className="desktop:hidden" height={32} />
            <MobileContentList params={params} searchParams={searchParams} />
            <Spacing className="desktop:hidden" height={32} />
            <MyPageItem title={t('home.items.change_auth')} path={`/${lang}/mypage/home/change-auth`} />
            <MyPageItem title={t('home.items.terms_of_service')} path={`/${lang}/mypage/home/terms-of-service`} />
            <MyPageItem title={t('home.items.logout')} path={`/${lang}/login`} />
            <MyPageItem
              title={t('home.items.withdraw')}
              textColor={'text-error'}
              path={`/${lang}/mypage/home/withdraw`}
            />
            <Spacing height={190} />
          </div>
        </div>
      </PageLayout>
      <Footer />
      <Spacing height={80} className={'desktop:hidden'} />
      <NavBar path={`/${lang}/mypage`} lang={lang} />
    </main>
  )
}
