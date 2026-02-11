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
      <div className="desktop:px-[40px] tablet:px-[32px] px-[20px] py-[20px]">{children}</div>
    </div>
  )
}
