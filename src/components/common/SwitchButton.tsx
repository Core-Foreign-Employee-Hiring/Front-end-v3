'use client'

interface SwitchButtonProps<T extends string> {
  contentList: { content: string; type: T }[]
  type: T
  onClick: (type: T) => void
}
export default function SwitchButton<T extends string>({ contentList, type, onClick }: SwitchButtonProps<T>) {
  return (
    <div className="bg-gray1 flex w-fit gap-x-2 rounded-[10px] p-1">
      {contentList.map((content) => (
        <button
          onClick={() => onClick(content.type)}
          key={content.type}
          className={`${type == content.type ? 'bg-main-500 kr-badge-md text-white' : 'kr-button text-gray5 bg-transparent'} flex w-[120px] cursor-pointer items-center justify-center rounded-[8px] py-3`}
        >
          {content.content}
        </button>
      ))}
    </div>
  )
}
