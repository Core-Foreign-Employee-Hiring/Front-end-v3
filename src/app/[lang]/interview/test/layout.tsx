import { PageLayout } from '@/components/common'
import { HeaderOption, HeaderTitle, InterviewHeader } from '@/components/interview'

export default async function InterviewLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ lang: string }>
}>) {
  const { lang } = await params
  return (
    <div>
      <InterviewHeader
        rightElement={<HeaderOption />}
        leftElement={<HeaderTitle title={'면접 타이틀'} description={'1/3번째 질문'} />}
      />
      <PageLayout>{children}</PageLayout>
    </div>
  )
}
