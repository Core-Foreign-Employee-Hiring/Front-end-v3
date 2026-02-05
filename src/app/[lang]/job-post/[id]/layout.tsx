import { PageLayout } from '@/components/common'

export default async function FindAuthLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ lang: string }>
}>) {
  return <PageLayout>{children}</PageLayout>
}
