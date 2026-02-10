interface CertificationsVer2ItemProps {
  title: string
  date: string
}
export default function CertificationsVer2Item({ title, date }: CertificationsVer2ItemProps) {
  return (
    <div className="desktop:flex-row desktop:pb-[32px] desktop:ml-[12px] border-main-500 flex flex-col gap-x-[20px] gap-y-2 border-l-[2px] pb-[24px] pl-[20px]">
      <div className="flex w-[300px] shrink-0 flex-col gap-y-2 whitespace-nowrap">
        <p className="kr-title-md">{title}</p>
        <p className="desktop:text-black kr-body-sm text-gray5">{date}</p>
      </div>
    </div>
  )
}
