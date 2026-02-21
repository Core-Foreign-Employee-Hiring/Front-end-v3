import { Label, PageLayout, Spacing, Tab } from '@/components/common'
import { SearchParams } from 'next/dist/server/request/search-params'
import InterviewHistory from '@/components/interview/InterviewHistory'
import InterviewNote from '@/components/interview/InterviewNote'
import InterviewHome from '@/components/interview/InterviewHome'
import StartInterviewButton from '@/components/interview/StartInterviewButton'
import NavBar from '@/components/common/NavBar'
import { getTranslationServer } from '@/lib/i18n'
import { Locale } from '@/lib/i18n.types'

interface InterViewPageProps {
  params: Promise<{ lang: Locale }>
  searchParams: SearchParams
}

export type TabType = 'home' | 'history' | 'note'

function FindInterviewProcessStepSwitcher({ tab, lang }: { lang: Locale; tab: TabType }) {
  if (tab === 'home') return <InterviewHome />
  if (tab === 'history') return <InterviewHistory />
  if (tab === 'note') return <InterviewNote lang={lang} />
  return <InterviewHome />
}

export default async function InterviewPage({ params, searchParams }: InterViewPageProps) {
  const { lang } = await params
  const { t } = await getTranslationServer(lang, ['interview'])
  const resolvedSearchParams = await searchParams

  const tab = (resolvedSearchParams.tab as TabType) || 'home'

  const tabList: { content: string; path: string; key: string }[] = [
    { content: t('interview:menu.home'), path: `/${lang}/interview?tab=home`, key: 'home' },
    { content: t('interview:menu.history'), path: `/${lang}/interview?tab=history`, key: 'history' },
    { content: t('interview:menu.note'), path: `/${lang}/interview?tab=note`, key: 'note' },
  ]
  return (
    <main>
      <PageLayout>
        <div className="w-full">
          <Label label={t('interview:title')} type={'titleLg'} rightElement={<StartInterviewButton />} />
          <Spacing height={20} />

          <Tab tabList={tabList} />
          <Spacing height={20} />

          <FindInterviewProcessStepSwitcher lang={lang} tab={tab} />
        </div>
      </PageLayout>
      <Spacing height={80} />
      <NavBar path={`/${lang}/interview`} lang={lang} />
    </main>
  )
}
