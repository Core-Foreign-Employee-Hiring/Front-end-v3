import { Header } from '@/components/common'
import { Locale } from '@/lib/i18n.types'
import { getTranslationServer } from '@/lib/i18n'

export default async function ContentLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ lang: string }>
}>) {
  const { lang } = await params
  const currentLang = lang as Locale
  const { t } = await getTranslationServer(currentLang, 'content')

  return (
    <div>
      <div className="desktop:block hidden">
        <Header headerType={'default'} currentLng={lang} />
      </div>
      <div className="desktop:hidden block">
        <Header headerType={'dynamic'} currentLng={lang} title={t('home.title')} />
      </div>
      {children}
    </div>
  )
}
