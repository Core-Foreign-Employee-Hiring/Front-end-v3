import Footer from '@/components/common/Footer'
import { Spacing } from '@/components/common'
import BottomButtons from '@/components/content/BottomButtons'

export default async function ContentDetailLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ lang: string; id: string }>
}>) {
  const { lang, id } = await params
  return (
    <div>
      {children}
      <Spacing height={80} />
      <Footer />

      <Spacing className={'desktop:hidden'} height={100} />
      <BottomButtons archiveId={id} />
    </div>
  )
}
