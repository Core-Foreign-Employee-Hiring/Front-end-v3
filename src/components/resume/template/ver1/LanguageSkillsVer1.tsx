import LanguageSkillItem from '@/components/resume/template/ver1/LanguageSkillItem'
import { ResumeLanguageSkillType } from '@/types/resume'
import { Spacing } from '@/components/common'

interface LanguageSkillsVer1Props {
  languageSkills: ResumeLanguageSkillType[] | undefined
}

export default function LanguageSkillsVer1({ languageSkills }: LanguageSkillsVer1Props) {
  return (
    <div className="flex w-full gap-x-[20px] border-b-[2px] border-black py-[40px]">
      <div className="kr-title-md w-[200px] shrink-0 whitespace-nowrap">어학능력</div>
      <div className="flex w-full flex-col gap-y-[24px]">
        {languageSkills?.map((languageSkill, index) => {
          const isLastIndex = languageSkills?.length - 1 === index
          return (
            <div key={languageSkill.id}>
              <LanguageSkillItem title={languageSkill.title} content={languageSkill.score} />
              {isLastIndex ? null : (
                <div>
                  <Spacing height={24} />
                  <div className="border-gray2 border-b" />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
