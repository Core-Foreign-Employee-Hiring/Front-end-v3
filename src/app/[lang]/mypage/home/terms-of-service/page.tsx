import { Header, PageLayout, Spacing } from '@/components/common'
import MyPageItem from '@/components/mypage/MyPageItem'
import Footer from '@/components/common/Footer'
import { Locale } from '@/types/i18n.types'
import { getTranslationServer } from '@/lib/i18n'

export default async function TermsOfServicePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const currentLang = lang as Locale
  const { t } = await getTranslationServer(currentLang, 'my')

  return (
    <main>
      <Header currentLng={lang} title={t('terms_of_service.header')} headerType={'dynamic'} />
      <PageLayout>
        <MyPageItem
          path={`/${lang}/mypage/home/terms-of-service/service`}
          title={t('terms_of_service.items.service')}
        />
        <MyPageItem path={`/${lang}/mypage/home/terms-of-service/info`} title={t('terms_of_service.items.privacy')} />
        <MyPageItem
          path={`/${lang}/mypage/home/terms-of-service/sms`}
          title={t('terms_of_service.items.marketing_sms')}
        />
        <MyPageItem
          path={`/${lang}/mypage/home/terms-of-service/email`}
          title={t('terms_of_service.items.marketing_email')}
        />
      </PageLayout>
      <Spacing height={430} />
      <Footer />
    </main>
  )
}
