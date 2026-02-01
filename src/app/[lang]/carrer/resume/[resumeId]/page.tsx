import TemplateVer1 from '@/components/resume/template/TemplateVer1'
import TemplateVer2 from '@/components/resume/template/TemplateVer2'
import { fetchResumeResult } from '@/lib/server/resume'
import { ResumeType } from '@/types/resume'
import BottomButton from '@/components/resume/template/BottomButton'
import { Spacing } from '@/components/common'

export type TemplateType = 'ver1' | 'ver2'

function FindResumeTypeSwitcher({ type, resumeData }: { type: TemplateType; resumeData: ResumeType | undefined }) {
  if (type === 'ver1') return <TemplateVer1 resumeData={resumeData} />
  if (type === 'ver2') return <TemplateVer2 />
  return <TemplateVer1 resumeData={resumeData} />
}

export default async function ResumeDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string; resumeId: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { lang, resumeId } = await params
  const resolvedSearchParams = await searchParams
  const type = (resolvedSearchParams.step as TemplateType) || 'ver1'
  const result = await fetchResumeResult(resumeId)
  console.log('result', result.data)

  return (
    <main>
      <div id="resume-print-area">
        <FindResumeTypeSwitcher type={type} resumeData={result.data} />
      </div>

      <Spacing height={92} />
      <BottomButton targetId="resume-print-area" />
    </main>
  )
}
