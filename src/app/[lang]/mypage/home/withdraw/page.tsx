import { Header, PageLayout } from '@/components/common'
import { Locale } from '@/types/i18n.types'
import { getTranslationServer } from '@/lib/i18n'

export default async function WithDrawPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const currentLang = lang as Locale
  const { t } = await getTranslationServer(currentLang, 'my')

  return (
    <main>
      <Header headerType={'dynamic'} title={t('withdraw_page.title')} currentLng={lang} />
      <PageLayout>
        <ol className="kr-subtitle-md list-inside list-decimal space-y-[20px]">
          {/* 1. 즉시 삭제 */}
          <li>
            {t('withdraw_page.list.immediate_deletion.title')}
            <ul className="kr-subtitle-sm mt-2 ml-3 list-inside list-disc space-y-1">
              <li>{t('withdraw_page.list.immediate_deletion.description')}</li>
            </ul>
          </li>

          {/* 2. 정보 보관 */}
          <li>
            {t('withdraw_page.list.retention_policy.title')}
            <ul className="kr-subtitle-sm mt-2 ml-3 list-inside list-disc space-y-1">
              <li>{t('withdraw_page.list.retention_policy.description')}</li>
            </ul>
          </li>

          {/* 경고 문구 */}
          <div className="flex flex-col gap-y-1">
            <p className="kr-button text-error">{t('withdraw_page.warnings.no_recovery')}</p>
            <p className="kr-button text-error">{t('withdraw_page.warnings.no_refund')}</p>
          </div>
        </ol>

        {/* 주석 해제 시 적용 예시 */}
        {/* <div className="flex flex-col gap-y-2">
          <Label type={'subtitleMd'} label={t('withdraw_page.reason_section.label')} />
          <TextInput
            value={''}
            textType={'textArea'}
            placeholder={t('withdraw_page.reason_section.placeholder')}
          />
        </div>
        */}
      </PageLayout>
    </main>
  )
}
