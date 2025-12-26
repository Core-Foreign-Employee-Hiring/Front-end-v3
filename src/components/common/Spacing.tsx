interface SpacingProps {
  width?: number
  height?: number
  className?: string
}
export default function Spacing({ width = 0, height = 0, className }: SpacingProps) {
  return (
    <div
      className={className}
      style={{
        width: width ? `${width}px` : undefined,
        height: height ? `${height}px` : undefined,
        flexShrink: 0, // flex 부모 안에서 줄어들지 않도록 방지
      }}
      aria-hidden="true"
    />
  )
}
