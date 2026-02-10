import Link from 'next/link'

interface URLsVer2ItemProps {
  title: string
  url: string
}

export default function URLsVer2Item({ title, url }: URLsVer2ItemProps) {
  return (
    <div className="desktop:flex-row desktop:pb-[32px] desktop:ml-[12px] border-main-500 flex flex-col gap-x-[20px] gap-y-2 border-l-[2px] pb-[24px] pl-[20px]">
      <div className="flex w-[300px] shrink-0 flex-col gap-y-2 whitespace-nowrap">
        <p className="kr-title-md">{title}</p>
      </div>
      <div className="flex flex-col gap-y-2">
        <Link href={url} className="kr-body-md underline">
          {url}
        </Link>
      </div>
    </div>
  )
}
