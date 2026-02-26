import HeaderTitle from '@/components/interview/test/HeaderTitle'
import HeaderOption from '@/components/interview/test/HeaderOption'
import InterviewHeader from '@/components/interview/InterviewHeader'

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
      <InterviewHeader leftElement={<HeaderTitle />} rightElement={<HeaderOption />} />
      <div className="desktop:px-[40px] tablet:px-[32px] px-[20px] py-[20px]">{children}</div>
    </div>
  )
}
