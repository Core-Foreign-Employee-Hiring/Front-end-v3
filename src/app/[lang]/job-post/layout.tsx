import { Header, Spacing } from '@/components/common'
import Footer from '@/components/common/Footer'
import NavBar from '@/components/common/NavBar'

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
      <Header currentLng={lang} headerType={'default'} />
      {children}

      <Footer />
      <Spacing height={80} />
      <NavBar path={`/${lang}/job-post`} lang={lang} />
    </div>
  )
}
