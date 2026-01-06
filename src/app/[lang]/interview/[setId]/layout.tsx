import { PageLayout } from '@/components/common'
import { InterviewHeader, ResultHeaderOption, ResultHeaderTitle } from '@/components/interview'

export default async function InterviewResultLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ lang: string }>
}>) {
  const { lang } = await params
  return (
    <div>
      <InterviewHeader rightElement={<ResultHeaderOption />} leftElement={<ResultHeaderTitle />} />
      <PageLayout>{children}</PageLayout>
    </div>
  )
}
