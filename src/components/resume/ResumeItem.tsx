'use client'

import ResumeButtons from '@/components/resume/ResumeButtons'
import ResumeItemContent from '@/components/resume/ResumeItemContent'
import { useRouter } from 'next/navigation'

interface ResumeItemProps {
  lang: string
  resumeId: number
  title: string
  createdAt?: string
  modifiedAt?: string
}

export default function ResumeItem({ lang, title, createdAt, modifiedAt, resumeId }: ResumeItemProps) {
  const router = useRouter()

  return (
    <div
      onClick={() => {
        router.push(`/${lang}/carrer/resume/${resumeId}/Modern`)
      }}
      className="border-gray2 hover:border-gray3 flex cursor-pointer items-center justify-between rounded-[12px] border p-5 transition"
    >
      <ResumeItemContent title={title} createdAt={createdAt} modifiedAt={modifiedAt} id={resumeId} />
      <ResumeButtons resumeId={resumeId} />
    </div>
  )
}
