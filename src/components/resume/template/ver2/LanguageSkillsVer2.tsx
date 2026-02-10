import { ResumeLanguageSkillType } from '@/types/resume'
import LanguageSkillsVer2Item from '@/components/resume/template/ver2/LanguageSkillsVer2Item'

interface LanguageSkillsVer2Props {
  languageSkills: ResumeLanguageSkillType[] | undefined
}

export default function LanguageSkillsVer2({ languageSkills }: LanguageSkillsVer2Props) {
  return (
    <div className="flex flex-col gap-y-[24px] border-b-[2px] border-black py-[40px]">
      <div className="kr-title-lg">어학능력</div>

      {languageSkills?.map((languageSkill) => (
        <LanguageSkillsVer2Item key={languageSkill.id} title={languageSkill.title} content={languageSkill.score} />
      ))}
    </div>
  )
}
