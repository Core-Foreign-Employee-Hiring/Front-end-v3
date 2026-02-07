import { TextInput } from '@/components/common'
import { useCreateJobPostStore } from '@/store/createJobPostStore'
import { ApplicationMethodType } from '@/types/job-post'

export default function DirectInputApplicationMethod() {
  const { updateCreateJobPost, createJobPost } = useCreateJobPostStore((state) => state)
  const convertPlaceHolder = (applicationMethod: ApplicationMethodType | undefined | null) => {
    switch (applicationMethod) {
      case 'EMAIL':
        return '이메일을 입력해주세요.'
      case 'PHONE_SMS':
        return '연락처를 입력해주세요.'
      default:
        return '링크를 입력해주세요.'
    }
  }

  return (
    <div className="flex cursor-pointer items-center gap-x-3">
      <div className="kr-subtitle-sm text-gray5 shrink-0">
        {createJobPost.applicationMethod === 'WEBSITE'
          ? '링크'
          : createJobPost.applicationMethod === 'PHONE_SMS'
            ? '연락처'
            : '이메일'}
      </div>
      <TextInput
        value={createJobPost.directInputApplicationMethod ?? ''}
        onChange={(e) => {
          updateCreateJobPost('directInputApplicationMethod', e.target.value)
        }}
        placeholder={convertPlaceHolder(createJobPost.applicationMethod)}
      />
    </div>
  )
}
