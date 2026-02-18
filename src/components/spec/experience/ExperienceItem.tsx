import { Badge, Button, Label } from '@/components/common'
import { SpecExperienceType } from '@/types/spec'
import { useRouter } from 'next/navigation'
import { DeleteIcon, EditIcon, Main500FireIcon } from '@/assets/svgComponents'
import { deleteSpecExperiences } from '@/lib/client/spec/experience'

interface ExperienceItemProps {
  toggleFormOpenState: () => void
  experience: SpecExperienceType
}
export default function ExperienceItem({ toggleFormOpenState, experience }: ExperienceItemProps) {
  const router = useRouter()

  return (
    <div className="border-gray2 flex flex-col gap-y-2 rounded-[12px] border p-5">
      <div className="flex items-start justify-between gap-x-[20px]">
        <section className="flex w-full flex-col gap-y-2">
          <div className="flex items-center gap-x-2">
            <Label label={experience.experience} type={'subtitleLg'} />
            {experience.beforeImprovementRate && experience.afterImprovementRate ? (
              <Badge leftIcon={<Main500FireIcon width={13} height={13} />}>
                개선률 {experience.beforeImprovementRate}% → {experience.afterImprovementRate}%
              </Badge>
            ) : null}
          </div>
        </section>
        <section className="desktop:flex tablet:flex hidden shrink-0 gap-x-2 whitespace-nowrap">
          <Button onClick={toggleFormOpenState} size={'sm'} variant={'outline'} customClassName="w-fit">
            수정
          </Button>
          <Button
            onClick={async () => {
              const result = await deleteSpecExperiences(`${experience.experienceId}`)
              if (result.success) {
                router.refresh()
              }
            }}
            size={'sm'}
            variant={'outline'}
            customClassName="w-fit"
          >
            삭제
          </Button>
        </section>

        <section className="desktop:hidden tablet:hidden flex shrink-0 gap-x-2 whitespace-nowrap">
          <Button
            leftIcon={<EditIcon width={24} height={24} />}
            onClick={toggleFormOpenState}
            size={'sm'}
            variant={'outline'}
            customClassName="w-[36px]"
          />
          <Button
            leftIcon={<DeleteIcon width={24} height={24} />}
            onClick={async () => {
              const result = await deleteSpecExperiences(`${experience.experienceId}`)
              if (result.success) {
                router.refresh()
              }
            }}
            size={'sm'}
            variant={'outline'}
            customClassName="w-[36px]"
          />
        </section>
      </div>
      <p className="kr-body-md text-gray5">
        {experience.startDate} ~ {experience.endDate ? experience.endDate : '현재 진행중'}
      </p>
      <p className="kr-body-md text-gray5">{experience.description}</p>
    </div>
  )
}
