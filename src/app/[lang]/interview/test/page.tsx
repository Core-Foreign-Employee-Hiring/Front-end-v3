import Chat from '@/components/interview/test/Chat'
import BottomField from '@/components/interview/test/BottomField'
import Spacing from '@/components/common/Spacing'

export default function InterviewTestClient() {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Chat />

      <Spacing height={200} />
      <BottomField />
    </div>
  )
}
