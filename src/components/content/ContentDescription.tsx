import { Label } from '@/components/common'

interface ContentDescriptionProps {
  description: string
}

export default function ContentDescription({ description }: ContentDescriptionProps) {
  return (
    <div className="tablet:px-[32px] desktop:px-[40px] flex flex-col gap-y-3 px-[20px]">
      <Label label="설명" type={'subtitleLg'} />
      <p className="kr-body-md">{description}</p>
    </div>
  )
}
