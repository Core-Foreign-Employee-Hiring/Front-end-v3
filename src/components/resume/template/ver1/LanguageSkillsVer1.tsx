import LanguageSkillItem from '@/components/resume/template/ver1/LanguageSkillItem'

export default function LanguageSkillsVer1() {
  return (
    <div className="flex w-full gap-x-[20px] border-b-[2px] border-black py-[40px]">
      <div className="kr-title-md w-[200px] shrink-0 whitespace-nowrap">어학능력</div>
      <div className="flex w-full flex-col gap-y-[24px]">
        <LanguageSkillItem title={'한국어'} content={'TOPIK II 5급'} />
        <div className="border-gray2 border-b" />
        <LanguageSkillItem title={'영어'} content={'TOEIC 850'} />
      </div>
    </div>
  )
}
