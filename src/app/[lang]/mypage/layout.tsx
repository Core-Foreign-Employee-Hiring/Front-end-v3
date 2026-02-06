import { Header, Label, PageLayout, Spacing } from '@/components/common'
import Footer from '@/components/common/Footer'
import SideBar from '@/components/mypage/SideBar'

export default async function MyPageLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ lang: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}>) {
  const { lang } = await params

  return (
    <div>
      <Header headerType={'default'} currentLng={lang} />
      <PageLayout>
        <Label label={'마이페이지'} type={'titleLg'} />
        <Spacing height={16} />
        <div className="flex gap-x-[32px]">
          <SideBar lang={lang} />
          {children}
        </div>
      </PageLayout>
      <Footer />
    </div>
  )
}
