'use client'

import { Button, Label } from '@/components/common'
import { SpecEducationType } from '@/types/spec'
import { useRouter } from 'next/navigation'
import { deleteSpecEducation } from '@/lib/client/spec/education'
import { DeleteIcon, EditIcon } from '@/assets/svgComponents'
import { useTranslation } from 'react-i18next'

interface EducationItemProps {
  education: SpecEducationType
  onEdit: () => void
}

export default function EducationItem({ education, onEdit }: EducationItemProps) {
  const router = useRouter()
  const { t } = useTranslation(['spec'])
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

      <section className="desktop:flex tablet:flex hidden shrink-0 gap-x-2 whitespace-nowrap">
        <Button onClick={onEdit} customClassName={'w-fit'} variant={'outline'} size={'sm'}>
          {t('buttons.edit')}
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
          {t('buttons.delete')}
        </Button>
      </section>

      <section className="desktop:hidden tablet:hidden flex shrink-0 gap-x-2 whitespace-nowrap">
        <Button
          leftIcon={<EditIcon width={24} height={24} />}
          customClassName="w-[36px]"
          onClick={onEdit}
          variant={'outline'}
          size={'sm'}
        />
        <Button
          onClick={async () => {
            const result = await deleteSpecEducation(`${education.educationId}`)
            if (result.success) {
              router.refresh()
            }
          }}
          leftIcon={<DeleteIcon width={24} height={24} />}
          customClassName="w-[36px]"
          variant={'outline'}
          size={'sm'}
        />
      </section>
    </div>
  )
}
