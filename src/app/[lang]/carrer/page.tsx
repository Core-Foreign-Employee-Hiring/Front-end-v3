import { SearchParams } from 'next/dist/server/request/search-params'
import { Header, Label, PageLayout, Spacing, Tab } from '@/components/common'
import Spec from '@/components/spec/Spec'
import Resume from '@/components/spec/Resume'
import { fetchResumeList } from '@/lib/server/resume'
import { ResumeListType } from '@/types/resume'
import AuthWatcher from '@/components/auth/AuthWatcher'
import { getTranslationServer } from '@/lib/i18n'
import { Locale } from '@/lib/i18n.types'

export type StepType = '1' | '2' | '3' | '4' | '5' | '6'
export type TabType = 'spec' | 'resume'

function FindCarrerStepSwitcher({
  tab,
  step,
  lang,
  resumeList,
}: {
  tab: TabType
  step: StepType
  lang: Locale
  resumeList: ResumeListType[] | undefined
}) {
  if (tab === 'spec') return <Spec step={step} lang={lang} />
  if (tab === 'resume') return <Resume resumeList={resumeList} lang={lang} />
  return <Spec step={step} lang={lang} />
}

export default async function SpecPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: Locale }>
  searchParams: SearchParams
}) {
  const { lang } = await params
  const { t } = await getTranslationServer(lang, ['spec', 'resume'])
  const resolvedSearchParams = await searchParams

  const step = (resolvedSearchParams.step as StepType) || '1'

  const tab = (resolvedSearchParams.tab as TabType) || 'spec'

  const tabList: { content: string; path: string; key: string }[] = [
    { content: t('spec:home.title'), path: `/${lang}/carrer?tab=spec`, key: 'spec' },
    { content: t('resume:title'), path: `/${lang}/carrer?tab=resume`, key: 'resume' },
  ]

  const resumeResult = await fetchResumeList(0, 20)
  console.log('resumeResult', resumeResult)

  return (
    <main>
      <AuthWatcher results={[resumeResult]} />

      <div className="desktop:block hidden">
        <Header headerType={'default'} currentLng={lang} />
      </div>
      <div className="desktop:hidden block">
        <Header headerType={'dynamic'} currentLng={lang} title={t('spec:title')} />
      </div>
      <PageLayout>
        <div className="w-full">
          <Label label={t('spec:title')} className={'desktop:block tablet:hidden hidden'} type={'titleLg'} />
          <Spacing height={20} className="desktop:block hidden" />

          <Tab tabList={tabList} />
          <Spacing height={20} />

          <FindCarrerStepSwitcher resumeList={resumeResult.data?.content} tab={tab} step={step} lang={lang} />
        </div>
      </PageLayout>
    </main>
  )
}
