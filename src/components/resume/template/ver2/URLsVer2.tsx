import URLsVer2Item from '@/components/resume/template/ver2/URLsVer2Item'
import { UrlType } from '@/types/resume'

interface URLsVer2Props {
  urls: UrlType[] | undefined
}

export default function URLsVer2({ urls }: URLsVer2Props) {
  return (
    <div className="flex flex-col gap-y-[24px] border-b-[2px] border-black py-[40px]">
      <div className="kr-title-lg">URL</div>

      {urls?.map((url) => (
        <URLsVer2Item key={url.urlLink} title={url.urlTitle} url={url.urlLink} />
      ))}
    </div>
  )
}
