import UrlItem from '@/components/resume/template/ver1/UrlItem'
import { UrlType } from '@/types/resume'

interface URLsVer1Props {
  urls: UrlType[] | undefined
}

export default function URLsVer1({ urls }: URLsVer1Props) {
  return (
    <div className="desktop:flex-row tablet:flex-row flex w-full flex-col gap-x-[20px] gap-y-[20px] border-b-[2px] border-black py-[40px]">
      <div className="kr-title-md w-[200px] shrink-0 whitespace-nowrap">URL</div>
      <div className="flex flex-col gap-y-[24px]">
        {urls?.map((url, index) => (
          <UrlItem key={url.urlLink} title={url.urlTitle} url={url.urlLink} />
        ))}
      </div>
    </div>
  )
}
