import { SearchParams } from 'next/dist/server/request/search-params'
import { Label, PageLayout, Spacing, Tab } from '@/components/common'
import Spec from '@/components/spec/Spec'
import Resume from '@/components/spec/Resume'
import { fetchResumeList } from '@/lib/server/resume'
import { ResumeListType } from '@/types/resume'

export type StepType = '1' | '2' | '3' | '4' | '5'
export type TabType = 'spec' | 'resume'

function FindCarrerStepSwitcher({
  tab,
  step,
  resumeList,
}: {
  tab: TabType
  step: StepType
  resumeList: ResumeListType[] | undefined
}) {
  if (tab === 'spec') return <Spec step={step} />
  if (tab === 'resume') return <Resume resumeList={resumeList} />
  return <Spec step={step} />
}

export default async function SpecPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>
  searchParams: SearchParams
}) {
  const { lang } = await params
  const resolvedSearchParams = await searchParams

  const step = (resolvedSearchParams.step as StepType) || '1'

  const tab = (resolvedSearchParams.tab as TabType) || 'spec'

  const tabList: { content: string; path: string; key: string }[] = [
    { content: '스펙 관리', path: `/${lang}/carrer?tab=spec`, key: 'spec' },
    { content: '이력서', path: `/${lang}/carrer?tab=resume`, key: 'resume' },
  ]

  const resumeResult = await fetchResumeList(0, 20)
  console.log('resumeResult', resumeResult)

  return (
    <PageLayout>
      <main className="w-full">
        <Label label={'커리어 진단'} className={'desktop:block tablet:hidden hidden'} type={'titleLg'} />
        <Spacing height={20} className="desktop:block hidden" />

        <Tab tabList={tabList} />
        <Spacing height={20} />

        <FindCarrerStepSwitcher resumeList={resumeResult.data?.content} tab={tab} step={step} />
      </main>
    </PageLayout>
  )
}
