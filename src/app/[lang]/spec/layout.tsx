import PageLayout from '@/components/common/PageLayout'
import Header from '@/components/common/Header'

export default async function SpecLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ lang: string }>
}>) {
  const { lang } = await params
  return (
    <div>
      <Header headerType={'default'} currentLng={lang} />
      <PageLayout>{children}</PageLayout>
    </div>
  )
}
