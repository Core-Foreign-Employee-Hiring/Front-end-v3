import UserInfo from '@/components/mypage/home/UserInfo'
import MyPageItem from '@/components/mypage/MyPageItem'
import { Spacing } from '@/components/common'
import { fetchMyPageUserInfo } from '@/lib/server/mypage'

interface MyPageHomeProps {
  params: Promise<{ lang: string }>
}

export default async function HomePage({ params }: MyPageHomeProps) {
  const { lang } = await params
  const result = await fetchMyPageUserInfo()
  console.log('result', result)
  const userInfo = result.data
  return (
    <div className="w-full">
      <UserInfo userInfo={userInfo} />
      <Spacing height={16} />
      <MyPageItem title={'아이디/비밀번호 변경'} path={`/${lang}/mypage/find-auth`} />
      {/*<MyPageItem title={'문의하기'} path={`/${lang}/mypage?tab=ask`} />*/}
      <MyPageItem title={'이용 약관'} path={`/${lang}/mypage/terms-of-service`} />
      <MyPageItem title={'로그아웃'} path={`/${lang}/mypage?tab=logout`} />
      <MyPageItem title={'탈퇴하기'} textColor={'text-error'} path={`/${lang}/mypage?tab=withdraw`} />
      <Spacing height={190} />
    </div>
  )
}
