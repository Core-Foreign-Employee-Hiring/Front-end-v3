import Image from 'next/image'

interface ContentImagesProps {
  imageUrls: string[]
}
export default function ContentImages({ imageUrls }: ContentImagesProps) {
  return (
    <div className="desktop:px-[40px] tablet:px-[32px] px-[20px]">
      <div className="flex w-full gap-x-3 overflow-x-scroll">
        {imageUrls.map((imageUrl) => (
          <div key={imageUrl} className="relative h-[250px] w-[420px] shrink-0 whitespace-nowrap">
            <Image src={imageUrl} alt={'사진'} className="rounded-[16px] object-cover" fill />
          </div>
        ))}
      </div>
    </div>
  )
}
