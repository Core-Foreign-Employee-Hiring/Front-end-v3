'use client'

import { Button } from '@/components/common'
import { deleteResume } from '@/lib/client/resume'
import { useRouter } from 'next/navigation'

interface ResumeButtonsProps {
  resumeId: number
}

export default function ResumeButtons({ resumeId }: ResumeButtonsProps) {
  const router = useRouter()
  return (
    <div className="flex gap-x-[7px]">
      {/*<Button customClassName="w-[60px]" variant={'outline'} size={'sm'}>*/}
      {/*  수정*/}
      {/*</Button>*/}
      <Button
        onClick={(e) => {
          e.stopPropagation()
          deleteResume(resumeId).then(() => {
            router.refresh()
          })
        }}
        customClassName="w-[60px]"
        variant={'outline'}
        size={'sm'}
      >
        삭제
      </Button>
    </div>
  )
}
