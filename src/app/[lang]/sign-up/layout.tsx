import { Header, PageLayout } from '@/components/common'

export default async function SignUpLayout({
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
        <Header headerType={'dynamic'} currentLng={lang} title={'회원가입'} />
      </div>
      <PageLayout>{children}</PageLayout>
    </div>
  )
}
