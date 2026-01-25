import { Button, Label, Spacing } from '@/components/common'
import Image from 'next/image'
import { UploadIcon } from '@/assets/svgComponents'

export default function ProfileImageUploader() {
  return (
    <div>
      <Label label={'사진'} type={'titleSm'} isRequired={true} />

      <Spacing height={8} />
      <Image width={184} height={240} alt={'프로필'} src={'/profile.jpg'} className={'rounded-[8px]'} />

      <Spacing height={8} />
      <Button
        leftIcon={<UploadIcon width={20} height={20} />}
        size={'sm'}
        variant={'outline'}
        customClassName={'w-[110px]'}
      >
        재업로드
      </Button>
    </div>
  )
}
