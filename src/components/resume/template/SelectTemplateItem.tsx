import { Button, Spacing } from '@/components/common'
import Image from 'next/image'
import { useResumeStore } from '@/store/resumeStore'

interface SelectTemplateItemProps {
  type: 'ver1' | 'ver2'
  selectedType: 'ver1' | 'ver2'
  setSelectedType: (type: 'ver1' | 'ver2') => void
  imageUrl: string
}

export default function SelectTemplateItem({ type, selectedType, setSelectedType, imageUrl }: SelectTemplateItemProps) {
  const { updateCreateResumeField } = useResumeStore((state) => state)
  return (
    <div
      onClick={() => {
        setSelectedType(type)
        updateCreateResumeField('template', type)
      }}
      className="w-full"
    >
      <div className="flex items-center gap-x-2">
        {type === selectedType ? (
          <button className="bg-main-500 flex h-[20px] w-[20px] items-center justify-center rounded-full">
            <div className="h-[10px] w-[10px] rounded-full bg-white" />
          </button>
        ) : (
          <div className="border-gray3 h-[20px] w-[20px] rounded-full border" />
        )}

        <p className="kr-button text-gray5">{type}</p>
      </div>

      <Spacing height={8} />

      <div
        className={`${type === selectedType ? 'border-main-500' : 'border-gray2'} relative h-[260px] w-full rounded-[12px] border`}
      >
        <Image src={imageUrl} alt={'이미지'} className="rounded-[12px] object-cover" fill />
        <Button customClassName={'absolute bottom-[16px] right-[16px] w-[85px]'} size={'sm'} variant={'outline'}>
          미리보기
        </Button>
      </div>
    </div>
  )
}
