import { Locale } from '@/lib/i18n.types'

export default async function ContentLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ lang: string }>
}>) {
  const { lang } = await params
  const currentLang = lang as Locale

  return <div>{children}</div>
}
