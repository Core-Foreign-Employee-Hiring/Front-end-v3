import { PageLayout } from '@/components/common'
import { InterviewHeader, TestHeaderOption, TestHeaderTitle } from '@/components/interview'

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
      <InterviewHeader leftElement={<TestHeaderTitle />} rightElement={<TestHeaderOption />} />
      <PageLayout>{children}</PageLayout>
    </div>
  )
}
