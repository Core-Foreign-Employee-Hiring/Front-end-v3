interface LanguageSkillsVer2ItemProps {
  title: string
  content: string
}
export default function LanguageSkillsVer2Item({ title, content }: LanguageSkillsVer2ItemProps) {
  return (
    <div className="desktop:flex-row desktop:pb-[32px] desktop:ml-[12px] border-main-500 flex flex-col gap-x-[20px] gap-y-2 border-l-[2px] pb-[24px] pl-[20px]">
      <div className="flex w-[300px] shrink-0 flex-col gap-y-2 whitespace-nowrap">
        <p className="kr-title-md">{title}</p>
      </div>
      <div className="flex flex-col gap-y-2">
        <p className="kr-body-md">{content}</p>
      </div>
    </div>
  )
}
