interface CertificationItemProps {
  title: string
  date: string
}
export default function CertificationItem({ title, date }: CertificationItemProps) {
  return (
    <div className="flex items-center justify-between">
      <p className="kr-title-md">{title}</p>
      <p className="kr-body-sm">{date}</p>
    </div>
  )
}
