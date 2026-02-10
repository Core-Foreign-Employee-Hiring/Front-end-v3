import Link from 'next/link'

interface UrlItemProps {
  title: string
  url: string
}
export default function UrlItem({ title, url }: UrlItemProps) {
  return (
    <div className="flex flex-col gap-y-2">
      <p className="desktop:kr-title-md tablet:kr-title-md kr-subtitle-lg">{title}</p>
      <Link href={url} className="desktop:kr-body-md tablet:kr-body-md kr-body-sm underline">
        {url}
      </Link>
    </div>
  )
}
