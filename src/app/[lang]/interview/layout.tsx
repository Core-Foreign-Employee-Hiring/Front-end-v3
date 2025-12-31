import { Header, PageLayout } from '@/components/common'

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
      <div className="desktop:block hidden">
        <Header headerType={'default'} currentLng={lang} />
      </div>
      <div className="desktop:hidden block">
        <Header headerType={'dynamic'} currentLng={lang} title={'스펙입력'} />
      </div>
      <PageLayout>{children}</PageLayout>
    </div>
  )
}
