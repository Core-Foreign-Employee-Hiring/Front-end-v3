export default async function InterviewNoteDetailLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ lang: string }>
}>) {
  return <div>{children}</div>
}
