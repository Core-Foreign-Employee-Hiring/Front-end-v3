import { Header, Spacing } from '@/components/common'
import NavBar from '@/components/common/NavBar'

export default async function ContentLayout({
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
      {children}
      <Spacing height={80} />
      <NavBar path={`/${lang}/interview`} lang={lang} />
    </div>
  )
}
