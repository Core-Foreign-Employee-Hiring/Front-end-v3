import { Button, Label, Spacing } from '@/components/common'
import UrlField from '@/components/resume/info-form/UrlField'
import { GrayPlusIcon } from '@/assets/svgComponents'

export default function UrlList() {
  return (
    <div>
      <Label label={'URL'} type={'titleSm'} />
      <Spacing height={8} />
      <UrlField />

      <Spacing height={8} />
      <UrlField />

      <Spacing height={8} />
      <Button
        customClassName={'w-[115px]'}
        leftIcon={<GrayPlusIcon width={20} height={20} />}
        size={'sm'}
        variant={'outline'}
      >
        URL 추가
      </Button>
    </div>
  )
}
