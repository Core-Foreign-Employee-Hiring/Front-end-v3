import BottomField from '@/components/interview/test/BottomField'
import Chat from '@/components/interview/test/Chat'
import { Spacing } from '@/components/common'

export default function InterviewTestPage() {
  return (
    <main className="w-full">
      <Chat />

      <Spacing height={200} />
      <BottomField />
    </main>
  )
}
