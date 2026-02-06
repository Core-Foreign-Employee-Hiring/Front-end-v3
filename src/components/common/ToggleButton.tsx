interface ToggleButtonProps {
  type: 'SELECT' | 'UNSELECT'
  onClick?: () => void
}
export default function ToggleButton({ type, onClick }: ToggleButtonProps) {
  return type === 'SELECT' ? (
    <div
      onClick={onClick}
      className="bg-main-500 flex h-[20px] w-[20px] cursor-pointer items-center justify-center rounded-full"
    >
      <div className="h-[10px] w-[10px] rounded-full bg-white" />
    </div>
  ) : (
    <div onClick={onClick} className="border-gray3 h-[20px] w-[20px] cursor-pointer rounded-full border-[1.6px]" />
  )
}
