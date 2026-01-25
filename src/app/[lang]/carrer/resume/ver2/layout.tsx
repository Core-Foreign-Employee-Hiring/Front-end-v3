import { PageLayout } from '@/components/common'

export default async function ResumeVer2Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ lang: string }>
}>) {
  const { lang } = await params
  return (
    <div>
      <PageLayout>{children}</PageLayout>
    </div>
  )
}
