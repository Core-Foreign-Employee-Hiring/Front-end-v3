import { Header, Label, PageLayout, ResultContent, Spacing } from '@/components/common'
import CTAButton from '@/components/spec/result/CTAButton'
import { fetchSpecResult } from '@/lib/server/spec'
import Chat from '@/components/spec/result/Chat'
import AuthWatcher from '@/components/auth/AuthWatcher'
import { getTranslationServer } from '@/lib/i18n'
import { Locale } from '@/lib/i18n.types'

interface SpecResultProps {
  params: Promise<{ specEvaluationId: string; lang: Locale }>
}

export default async function SpecResult({ params }: SpecResultProps) {
  const { specEvaluationId, lang } = await params
  const { t } = await getTranslationServer(lang, ['spec'])

  const specResultResponse = await fetchSpecResult(specEvaluationId)
  const specResult = specResultResponse.data

  const ctaButtons: { step: '2' | '3' | '4'; content: string; path: string }[] = [
    { step: '2', content: t('spec:result.step2'), path: '/carrer?tab=resume' },
    { step: '3', content: t('spec:result.step3'), path: '/interview?tab=home' },
    { step: '4', content: t('spec:result.step4'), path: '/content' },
  ]

  return (
    <main>
      <div className="desktop:block hidden">
        <Header headerType={'default'} currentLng={lang} />
      </div>
      <div className="desktop:hidden block">
        <Header headerType={'dynamic'} currentLng={lang} title={t('home.title')} />
      </div>
      <PageLayout>
        <div>
          <AuthWatcher results={[specResultResponse]} />
          <Label label={t('spec:result.title')} type={'titleLg'} />

          <div className="tablet:flex-row tablet:gap-y-0 tablet:gap-x-[24px] desktop:gap-x-[24px] tablet:items-start flex flex-col items-center gap-y-[24px]">
            <Chat specResult={specResult} />
            <ResultContent analysis={specResult?.analysis} topPercent={specResult?.topPercent} />
          </div>

          <Spacing height={37} />
          <div className="desktop:flex-row desktop:gap-x-6 flex flex-col gap-y-5">
            {ctaButtons.map((ctaButton) => (
              <CTAButton
                key={ctaButton.step}
                step={ctaButton.step}
                path={ctaButton.path}
                stepContent={ctaButton.content}
              />
            ))}
          </div>

          <Spacing height={40} />
        </div>
      </PageLayout>
    </main>
  )
}
