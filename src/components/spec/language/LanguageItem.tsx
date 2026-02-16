'use client'

import { SpecLanguageSkillType } from '@/types/spec'
import { Button, Label } from '@/components/common'
import { deleteSpecLanguageSkills } from '@/lib/client/spec/language'
import { useRouter } from 'next/navigation'

interface LanguageItemProps {
  languageSkill: SpecLanguageSkillType
  toggleState: () => void
}

export default function LanguageItem({ languageSkill, toggleState }: LanguageItemProps) {
  const router = useRouter()
  return (
    <div className="border-gray2 flex items-start justify-between gap-x-[20px] rounded-[12px] border p-5">
      <section className="flex flex-col gap-y-2">
        <Label label={languageSkill.title} type={'subtitleLg'} />
        <p className="kr-body-md text-gray5">{languageSkill.score}</p>
      </section>

      <section className="flex gap-x-2">
        <Button onClick={toggleState} size={'sm'} variant={'outline'} customClassName="w-fit">
          수정
        </Button>
        <Button
          onClick={async () => {
            const result = await deleteSpecLanguageSkills(`${languageSkill.languageSkillId}`)
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
    </div>
  )
}
