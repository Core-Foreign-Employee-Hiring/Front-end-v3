'use client'

import { Button, Label } from '@/components/common'
import { SpecEducationType } from '@/types/spec'
import { useRouter } from 'next/navigation'
import { deleteSpecEducation } from '@/lib/client/spec/education'

interface EducationItemProps {
  education: SpecEducationType
  onEdit: () => void
}

export default function EducationItem({ education, onEdit }: EducationItemProps) {
  const router = useRouter()
  return (
    <div className="border-gray2 flex justify-between gap-x-[20px] rounded-[12px] border p-5">
      <section className="flex flex-col gap-y-2">
        <Label label={education.schoolName} type={'subtitleLg'} />
        <div className="flex gap-x-1">
          {education.majors.map((major, index) => {
            const isLast = index === education.majors.length - 1
            return (
              <p key={major} className="kr-body-md text-gray5">
                {major}
                {isLast ? '' : ','}
              </p>
            )
          })}
        </div>

        <p className="kr-body-md text-gray5">
          {education.earnedScore}/{education.maxScore}
        </p>
        <p className="kr-body-md text-gray5">
          {education.admissionDate} - {education.graduationDate}
        </p>
      </section>

      <section className="flex gap-x-2">
        <Button onClick={onEdit} customClassName={'w-fit'} variant={'outline'} size={'sm'}>
          수정
        </Button>
        <Button
          onClick={async () => {
            const result = await deleteSpecEducation(`${education.educationId}`)
            if (result.success) {
              router.refresh()
            }
          }}
          customClassName={'w-fit'}
          variant={'outline'}
          size={'sm'}
        >
          삭제
        </Button>
      </section>
    </div>
  )
}
