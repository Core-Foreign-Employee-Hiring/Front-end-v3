export type TemplateType = 'ver1' | 'ver2'

export default async function ResumeDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string; resumeId: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { lang, resumeId } = await params

  return <main></main>
}
