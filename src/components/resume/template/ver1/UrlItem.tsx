import Link from 'next/link'

interface UrlItemProps {
  title: string
  url: string
}
export default function UrlItem({ title, url }: UrlItemProps) {
  return (
    <div className="flex flex-col gap-y-2">
      <p className="kr-title-md">{title}</p>
      <Link href={url} className="kr-body-md underline">
        {url}
      </Link>
    </div>
  )
}
