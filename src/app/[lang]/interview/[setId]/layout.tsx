export default async function InterviewResultLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ lang: string }>
}>) {
  return <div>{children}</div>
}
