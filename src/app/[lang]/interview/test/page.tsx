import Chat from '@/components/interview/test/Chat'
import BottomField from '@/components/interview/test/BottomField'
import Spacing from '@/components/common/Spacing'

export default function InterviewTestClient() {
  return (
    <div className="w-full">
      <Chat />

      <Spacing height={200} />
      <BottomField />
    </div>
  )
}
