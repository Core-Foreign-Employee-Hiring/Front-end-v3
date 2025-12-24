import Label from '@/components/common/Label'
import Spacing from '@/components/common/Spacing'
import TextInput from '@/components/common/TextInput'

export default function EduDuration() {
  return (
    <div className="w-full">
      <Label label={'기간'} className="kr-subtitle-lg text-gray5" isRequired={true}></Label>
      <Spacing height={8} />
      <div className="flex w-full gap-x-4">
        <div className="flex-1">
          <TextInput placeholder={'YYYY.MM'} />
        </div>
        <div className="flex-1">
          <TextInput placeholder={'YYYY.MM'} />
        </div>
      </div>
    </div>
  )
}
