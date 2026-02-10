interface LanguageSkillItemProps {
  title: string
  content: string
}
export default function LanguageSkillItem({ title, content }: LanguageSkillItemProps) {
  return (
    <div className="flex flex-col gap-y-2">
      <p className="desktop:kr-title-md tablet:kr-title-md kr-subtitle-lg">{title}</p>
      <p className="desktop:kr-body-md tablet:kr-body-md kr-body-sm">{content}</p>
    </div>
  )
}
