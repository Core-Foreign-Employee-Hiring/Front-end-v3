import { Header } from '@/components/common'

export default async function LoginLayout({
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
        <Header headerType={'dynamic'} currentLng={lang} title={'로그인'} />
      </div>
      {children}
    </div>
  )
}
