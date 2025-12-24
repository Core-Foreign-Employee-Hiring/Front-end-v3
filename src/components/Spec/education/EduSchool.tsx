import Label from '@/components/common/Label'
import Spacing from '@/components/common/Spacing'
import TextInput from '@/components/common/TextInput'

export default function EduSchool() {
  return (
    <div className="w-full">
      <Label label={'학교명'} className="kr-subtitle-lg text-gray5" isRequired={true}></Label>
      <Spacing height={8} />
      <TextInput placeholder={'학교 검색'}></TextInput>
    </div>
  )
}
