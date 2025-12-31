import { NoteItemBody, NoteItemHeader } from '@/components/interview'

interface NoteItemProps {
  status: 'PENDING' | 'COMPLETED'
  title: string
  content: string
}

export default function NoteItem({ title, content, status }: NoteItemProps) {
  return (
    <div className="border-gray2 flex flex-col gap-y-2 rounded-[12px] border p-5">
      <NoteItemHeader title={title} status={status} />
      <NoteItemBody content={content} />
    </div>
  )
}
