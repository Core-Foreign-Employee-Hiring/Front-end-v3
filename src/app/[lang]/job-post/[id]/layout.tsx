import { Header, PageLayout, Spacing } from '@/components/common'
import Footer from '@/components/common/Footer'

export default async function FindAuthLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ lang: string }>
}>) {
  const { lang } = await params
  return (
    <div>
      <div className="desktop:hidden block">
        <Header headerType={'dynamic'} currentLng={lang} title={'공고'} />
      </div>
      <div className="desktop:block hidden">
        <Header headerType={'default'} currentLng={lang} />
      </div>
      <PageLayout>{children}</PageLayout>
      <Footer />
      <Spacing height={80} />
    </div>
  )
}
