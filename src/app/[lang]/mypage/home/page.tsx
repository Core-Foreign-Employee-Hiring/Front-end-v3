import UserInfo from '@/components/mypage/home/UserInfo'
import MyPageItem from '@/components/mypage/MyPageItem'
import { Header, Label, PageLayout, Spacing } from '@/components/common'
import { fetchMyPageUserInfo } from '@/lib/server/mypage'
import SideBar from '@/components/mypage/SideBar'
import Footer from '@/components/common/Footer'
import NavBar from '@/components/common/NavBar'
import MobileContentList from '@/components/mypage/home/MobileContentList'

interface MyPageHomeProps {
  params: Promise<{ lang: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function HomePage({ params, searchParams }: MyPageHomeProps) {
  const { lang } = await params
  const result = await fetchMyPageUserInfo()
  console.log('result', result)
  const userInfo = result.data
  return (
    <main>
      <Header headerType={'default'} currentLng={lang} />
      <PageLayout>
        <Label className={'desktop:block hidden'} label={'마이페이지'} type={'titleLg'} />
        <Spacing className={'desktop:block tablet:block hidden'} height={16} />
        <div className="flex gap-x-[32px]">
          <SideBar lang={lang} />
          <div className="w-full">
            <Spacing height={16} />
            <UserInfo userInfo={userInfo} />
            <Spacing className="desktop:hidden" height={32} />
            <MobileContentList params={params} searchParams={searchParams} />
            <Spacing className="desktop:hidden" height={32} />
            <MyPageItem title={'아이디/비밀번호 변경'} path={`/${lang}/mypage/change-auth`} />
            {/*<MyPageItem title={'문의하기'} path={`/${lang}/mypage?tab=ask`} />*/}
            <MyPageItem title={'이용 약관'} path={`/${lang}/mypage/terms-of-service`} />
            <MyPageItem title={'로그아웃'} path={`/${lang}/mypage?tab=logout`} />
            <MyPageItem title={'탈퇴하기'} textColor={'text-error'} path={`/${lang}/mypage?tab=withdraw`} />
            <Spacing height={190} />
          </div>
        </div>
      </PageLayout>
      <Footer />
      <Spacing height={80} />
      <NavBar path={`/${lang}/mypage`} lang={lang} />
    </main>
  )
}
