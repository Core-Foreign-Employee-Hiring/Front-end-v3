interface BottomBorderProps {
  color?: 'gray2' | 'gray1' | 'black' // 사용하실 컬러들을 추가하세요.
  height?: number
}

export default function BottomBorder({ color = 'gray2', height = 1 }: BottomBorderProps) {
  return (
    <div
      style={{
        borderColor: `var(--color-${color})`,
        borderBottomWidth: `${height}px`,
      }}
      className="border-b-solid w-full"
    />
  )
}
