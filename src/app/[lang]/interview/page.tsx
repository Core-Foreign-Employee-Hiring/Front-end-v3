import { Label, PageLayout, Spacing, Tab } from '@/components/common'
import { InterviewHome, InterviewNote } from '@/components/interview'
import { SearchParams } from 'next/dist/server/request/search-params'
import InterviewHistory from '@/components/interview/InterviewHistory' //서버 컴포넌트는 따로 지정

interface InterViewPageProps {
  params: Promise<{ lang: string }>
  searchParams: SearchParams
}

export type TabType = 'home' | 'history' | 'note'

function FindInterviewProcessStepSwitcher({ tab }: { tab: TabType }) {
  if (tab === 'home') return <InterviewHome />
  if (tab === 'history') return <InterviewHistory />
  if (tab === 'note') return <InterviewNote />
  return <InterviewHome />
}

export default async function InterviewPage({ params, searchParams }: InterViewPageProps) {
  const { lang } = await params
  const resolvedSearchParams = await searchParams

  const tab = (resolvedSearchParams.tab as TabType) || 'home'

  const tabList: { content: string; path: string; key: string }[] = [
    { content: '면접 홈', path: `/${lang}/interview?tab=home`, key: 'home' },
    { content: '면접 기록', path: `/${lang}/interview?tab=history`, key: 'history' },
    { content: '답변 노트', path: `/${lang}/interview?tab=note`, key: 'note' },
  ]
  return (
    <PageLayout>
      <main className="w-full">
        <Label label={'AI 면접'} type={'titleLg'} />
        <Spacing height={20} />

        <Tab tabList={tabList} />
        <Spacing height={20} />

        <FindInterviewProcessStepSwitcher tab={tab} />
      </main>
    </PageLayout>
  )
}
