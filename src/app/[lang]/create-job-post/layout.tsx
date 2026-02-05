import { Header, PageLayout } from '@/components/common'

export default async function CreateJobPostLayout({
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
