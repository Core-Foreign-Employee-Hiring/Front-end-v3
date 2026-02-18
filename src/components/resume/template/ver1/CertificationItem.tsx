interface CertificationItemProps {
  title: string
  date: string
}
export default function CertificationItem({ title, date }: CertificationItemProps) {
  return (
    <div className="desktop:justify-between tablet:justify-between desktop:flex-row tablet:flex-row flex flex-col gap-y-2">
      <p className="desktop:kr-title-md tablet:kr-title-md kr-subtitle-lg">{title}</p>
      <p className="desktop:kr-body-sm tablet:kr-body-sm kr-small text-gray5">{date}</p>
    </div>
  )
}
