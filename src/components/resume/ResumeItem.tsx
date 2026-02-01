import ResumeButtons from '@/components/resume/ResumeButtons'
import ResumeItemContent from '@/components/resume/ResumeItemContent'

interface ResumeItemProps {
  id: number
  title: string
  createdAt?: string
  modifiedAt?: string
}

export default function ResumeItem({ title, createdAt, modifiedAt, id }: ResumeItemProps) {
  return (
    <div className="border-gray2 flex items-center justify-between rounded-[12px] border p-5">
      <ResumeItemContent title={title} createdAt={createdAt} modifiedAt={modifiedAt} id={id} />
      <ResumeButtons resumeId={id} />
    </div>
  )
}
