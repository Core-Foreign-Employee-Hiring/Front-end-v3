interface ManualItemProps {
  number: number
  title: string
  content: string
}
export default function ManualItem({ number, title, content }: ManualItemProps) {
  return (
    <div className="flex w-full items-start gap-x-2 p-3">
      <div className="bg-main-500 kr-badge-md flex h-[24px] w-[24px] items-center justify-center rounded-[4px] text-white">
        {number}
      </div>
      <div className="flex flex-col gap-y-1">
        <p className="kr-subtitle-md">{title}</p>
        <p className="kr-button text-gray5">{content}</p>
      </div>
    </div>
  )
}
