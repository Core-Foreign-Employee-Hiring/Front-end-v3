import { Header, PageLayout, Spacing } from '@/components/common'
import Footer from '@/components/common/Footer'
import { Locale } from '@/lib/i18n.types'
import { getTranslationServer } from '@/lib/i18n'

export default async function ServicePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const currentLang = lang as Locale
  const { t } = await getTranslationServer(currentLang, 'my')

  return (
    <main>
      <Header headerType={'dynamic'} title={t('terms_of_service.sms_terms.title')} currentLng={lang} />
      <PageLayout>
        <ol className="kr-body-sm list-inside list-decimal space-y-4">
          {/* 1. Purpose */}
          <li>
            {t('terms_of_service.sms_terms.list.purpose.title')}
            <ul className="kr-body-sm mt-2 ml-3 list-inside list-disc space-y-1">
              <li>{t('terms_of_service.sms_terms.list.purpose.description')}</li>
            </ul>
          </li>

          {/* 2. Items */}
          <li>
            {t('terms_of_service.sms_terms.list.items.title')}
            <ul className="kr-body-sm mt-2 ml-3 list-inside list-disc space-y-1">
              <li>{t('terms_of_service.sms_terms.list.items.description')}</li>
            </ul>
          </li>

          {/* 3. Retention */}
          <li>
            {t('terms_of_service.sms_terms.list.retention.title')}
            <ul className="kr-body-sm mt-2 ml-3 list-inside list-disc space-y-1">
              <li dangerouslySetInnerHTML={{ __html: t('terms_of_service.sms_terms.list.retention.description') }} />
            </ul>
          </li>

          {/* 4. Refusal/Withdrawal */}
          <li>
            {t('terms_of_service.sms_terms.list.refusal.title')}
            <ul className="kr-body-sm mt-2 ml-3 list-inside list-disc space-y-1">
              <li>{t('terms_of_service.sms_terms.list.refusal.desc_1')}</li>
              <li>{t('terms_of_service.sms_terms.list.refusal.desc_2')}</li>
            </ul>
          </li>
        </ol>
      </PageLayout>
      <Spacing height={300} />
      <Footer />
    </main>
  )
}
