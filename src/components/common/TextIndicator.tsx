interface TextIndicatorProps {
  maxTextLength: number
  currentTextLength: number
}
export default function TextIndicator({ maxTextLength, currentTextLength }: TextIndicatorProps) {
  return (
    <p className="kr-subtitle-sm text-gray5">
      {currentTextLength}/{maxTextLength}
    </p>
  )
}
