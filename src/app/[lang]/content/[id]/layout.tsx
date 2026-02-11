import Footer from '@/components/common/Footer'
import { Spacing } from '@/components/common'

export default async function ContentDetailLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ lang: string }>
}>) {
  const { lang } = await params
  return (
    <div>
      {children}
      <Spacing height={80} />
      <Footer />
    </div>
  )
}
