import { Header, PageLayout, Spacing } from '@/components/common'
import MyPageItem from '@/components/mypage/MyPageItem'
import Footer from '@/components/common/Footer'

export default async function TermsOfServicePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  return (
    <main>
      <Header currentLng={lang} title={'이용약관'} headerType={'dynamic'} />
      <PageLayout>
        <MyPageItem path={`/${lang}/mypage/home/terms-of-service/service`} title={'서비스 이용약관 동의'} />
        <MyPageItem path={`/${lang}/mypage/home/terms-of-service/info`} title={'개인정보 수집 및 이용 동의'} />
        <MyPageItem path={`/${lang}/mypage/home/terms-of-service/sms`} title={'광고성 정보 수신 동의 (SNS/MMS)'} />
        <MyPageItem path={`/${lang}/mypage/home/terms-of-service/email`} title={'광고성 정보 수신 동의 (이메일)'} />
      </PageLayout>
      <Spacing height={430} />
      <Footer />
    </main>
  )
}
