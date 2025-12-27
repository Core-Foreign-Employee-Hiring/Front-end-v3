interface SwitchButtonProps {
  contentList: { content: string; type: 'award' | 'experience' }[]
  type: 'experience' | 'award'
  onClick: (type: 'award' | 'experience') => void
}
export default function SwitchButton({ contentList, type, onClick }: SwitchButtonProps) {
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
