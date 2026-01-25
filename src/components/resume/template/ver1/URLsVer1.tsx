import UrlItem from '@/components/resume/template/ver1/UrlItem'

export default function URLsVer1() {
  return (
    <div className="flex w-full gap-x-[20px] border-b-[2px] border-black py-[40px]">
      <div className="kr-title-md w-[200px] shrink-0 whitespace-nowrap">URL</div>
      <div className="flex flex-col gap-y-[24px]">
        <UrlItem title={'GitHub'} url={'https://github.com/rusia9217'} />
        <UrlItem title={'Portfolio'} url={'https://github.com/rusia9217'} />
      </div>
    </div>
  )
}
