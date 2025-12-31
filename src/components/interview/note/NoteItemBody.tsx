interface NoteItemBodyProps {
  content: string
}
export default function NoteItemBody({ content }: NoteItemBodyProps) {
  return <p className="kr-subtitle-md">{content}</p>
}
