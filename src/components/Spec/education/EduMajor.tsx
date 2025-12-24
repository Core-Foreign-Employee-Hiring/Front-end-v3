import Label from '@/components/common/Label'
import Spacing from '@/components/common/Spacing'
import TextInput from '@/components/common/TextInput'

export default function EduMajor() {
  return (
    <div className="w-full">
      <Label label={'전공명 및 학과'} className="kr-subtitle-lg text-gray5" isRequired={true}></Label>
      <Spacing height={8} />
      <TextInput placeholder={'전공 및 학과'}></TextInput>
    </div>
  )
}
