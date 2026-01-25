import ResumeButtons from '@/components/resume/ResumeButtons'
import ResumeItemContent from '@/components/resume/ResumeItemContent'

export default function ResumeItem() {
  return (
    <div className="border-gray2 flex items-center justify-between rounded-[12px] border p-5">
      <ResumeItemContent title={'이력서 명'} createdAt={'2024. 03. 31'} />
      <ResumeButtons />
    </div>
  )
}
